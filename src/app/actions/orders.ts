// app/actions/orders.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface CreateOrderData {
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export async function createOrder(orderData: CreateOrderData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Please login to place order" };
  }

  try {
    // Create order without customer columns (they'll come from user profile)
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total_amount: orderData.totalAmount,
        shipping_address: orderData.shippingAddress,
        status: "pending",
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items with unit_price (not price)
    const orderItems = orderData.items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      unit_price: item.price, // Note: using unit_price as per your schema
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Clear the user's cart
    const { error: cartError } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", user.id);

    if (cartError) throw cartError;

    // Update product stock quantities
    for (const item of orderData.items) {
      const { data: product } = await supabase
        .from("products")
        .select("stock_quantity")
        .eq("id", item.productId)
        .single();

      if (product) {
        const newStock = product.stock_quantity - item.quantity;
        await supabase
          .from("products")
          .update({ stock_quantity: newStock })
          .eq("id", item.productId);
      }
    }

    revalidatePath("/account");
    revalidatePath("/cart");
    revalidatePath("/products");

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order creation error:", error);
    return { success: false, error: "Failed to create order" };
  }
}
// app/actions/orders.ts - Fix getOrders function
export async function getOrders(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items(
        *,
        products(
          id, 
          name, 
          price, 
          image_folder,
          stock_quantity
        )
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Enrich orders with image URLs
  const enrichedOrders = await Promise.all(
    data.map(async (order) => {
      // Process order items
      const enrichedItems = await Promise.all(
        (order.order_items || []).map(async (item: any) => {
          let imageUrl = null;

          if (item.products?.image_folder) {
            const { data: imageData } = supabase.storage
              .from("products")
              .getPublicUrl(`${item.products.image_folder}/image_1.avif`);
            imageUrl = imageData.publicUrl;
          }

          return {
            id: item.id,
            quantity: item.quantity,
            price: item.unit_price || item.price, // Handle both field names
            products: {
              name: item.products?.name || "Product",
              price: item.products?.price || 0,
              image_url: imageUrl,
            },
          };
        }),
      );

      return {
        id: order.id,
        status: order.status,
        total_amount: order.total_amount,
        shipping_address: order.shipping_address || "No address provided",
        created_at: order.created_at,
        order_items: enrichedItems,
      };
    }),
  );

  return enrichedOrders;
}

export async function getOrderById(orderId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase.from("orders");
  select: `
      *,
      order_items(
        *,
        products(*)
      )
    `
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    return null;
  }

  // Enrich with image URLs
  if (data && data.order_items) {
    data.order_items = await Promise.all(
      data.order_items.map(async (item: any) => {
        if (item.products?.image_folder) {
          const { data: imageData } = supabase.storage
            .from("products")
            .getPublicUrl(`${item.products.image_folder}/image_1.avif`);

          return {
            ...item,
            products: {
              ...item.products,
              image_url: imageData.publicUrl,
            },
          };
        }
        return {
          ...item,
          products: {
            ...item.products,
            image_url: null,
          },
        };
      }),
    );
  }

  return data;
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return { success: false, error: "Admin access required" };
  }

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/orders");
  revalidatePath("/account");

  return { success: true };
}

export async function cancelOrder(orderId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Please login to cancel order" };
  }

  // Get the order first to check status
  const { data: order, error: fetchError } = await supabase
    .from("orders")
    .select("status")
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !order) {
    return { success: false, error: "Order not found" };
  }

  // Only allow cancellation of pending orders
  if (order.status !== "pending") {
    return { success: false, error: "Order cannot be cancelled at this stage" };
  }

  // Update order status to cancelled
  const { error: updateError } = await supabase
    .from("orders")
    .update({ status: "cancelled" })
    .eq("id", orderId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  // Restore product stock quantities
  const { data: orderItems } = await supabase
    .from("order_items")
    .select("product_id, quantity")
    .eq("order_id", orderId);

  if (orderItems) {
    for (const item of orderItems) {
      const { data: product } = await supabase
        .from("products")
        .select("stock_quantity")
        .eq("id", item.product_id)
        .single();

      if (product) {
        const newStock = product.stock_quantity + item.quantity;
        await supabase
          .from("products")
          .update({ stock_quantity: newStock })
          .eq("id", item.product_id);
      }
    }
  }

  revalidatePath("/account");
  revalidatePath("/products");

  return { success: true };
}
