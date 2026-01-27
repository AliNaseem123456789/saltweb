import { Star } from "lucide-react";

interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function ProductReviews({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) return null;

  const averageRating =
    reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length;

  return (
    <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-stone-800">
            Customer Feedback
          </h3>
          <div className="flex items-center mt-2 gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.round(averageRating) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-stone-600 font-medium">
              {averageRating.toFixed(1)} avg rating
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-t border-stone-100 pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-stone-800">
                  {review.user_name}
                </p>
                <div className="flex text-amber-400 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs text-stone-400">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-stone-600 mt-2 leading-relaxed italic">
              "{review.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
