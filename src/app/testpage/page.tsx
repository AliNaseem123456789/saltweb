import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

const BUCKET_NAME = 'products'

type ImageItem = {
  url: string
  path: string
}

type Product = {
  id: string
  name: string
  image_folder: string | null
}

export default async function TestImagesPage() {
  const supabase = await createClient()

  /* ===============================
     1. FETCH STORAGE FOLDERS + IMAGES
  =============================== */

  const { data: folders, error: folderError } = await supabase
    .storage
    .from(BUCKET_NAME)
    .list('', { limit: 100 })

  if (folderError) {
    return <pre>Error loading folders: {folderError.message}</pre>
  }

  const groupedImages: Record<string, ImageItem[]> = {}

  for (const folder of folders ?? []) {
    if (!folder.name) continue

    const { data: files } = await supabase
      .storage
      .from(BUCKET_NAME)
      .list(folder.name, { limit: 100 })

    const imagesInFolder: ImageItem[] = []

    for (const file of files ?? []) {
      if (!file.name.match(/\.(jpg|jpeg|png|webp)$/i)) continue

      const { data } = supabase
        .storage
        .from(BUCKET_NAME)
        .getPublicUrl(`${folder.name}/${file.name}`)

      imagesInFolder.push({
        url: data.publicUrl,
        path: `${folder.name}/${file.name}`,
      })
    }

    if (imagesInFolder.length > 0) {
      groupedImages[folder.name] = imagesInFolder
    }
  }

  /* ===============================
     2. FETCH PRODUCTS TABLE
  =============================== */

  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, name, image_folder')
    .order('created_at', { ascending: false })

  /* ===============================
     3. RENDER PAGE
  =============================== */

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-10 text-3xl font-bold">
        Supabase Storage ↔ Products Mapping Debug
      </h1>

      {/* =====================================
         STORAGE ONLY (RAW VIEW)
      ===================================== */}
      <section className="mb-20">
        <h2 className="mb-6 text-2xl font-bold">Storage Folders</h2>

        {Object.entries(groupedImages).map(([folderName, images]) => (
          <div key={folderName} className="mb-10">
            <h3 className="mb-3 font-mono text-sm font-semibold text-gray-700">
              {folderName}
            </h3>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {images.map((img) => (
                <Image
                  key={img.url}
                  src={img.url}
                  alt={img.path}
                  width={200}
                  height={200}
                  className="rounded bg-white object-contain p-2 shadow"
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* =====================================
         PRODUCTS → IMAGES MAPPING (IMPORTANT)
      ===================================== */}
      <section className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          Products → Image Folder Mapping
        </h2>

        {productsError && (
          <p className="mb-4 text-red-600">
            Error loading products: {productsError.message}
          </p>
        )}

        <div className="space-y-10">
          {products?.map((product) => {
            const folder = product.image_folder ?? ''
            const images = folder ? groupedImages[folder] : undefined

            return (
              <div
                key={product.id}
                className="rounded border border-gray-200 p-4"
              >
                <div className="mb-3">
                  <p className="font-semibold text-gray-800">
                    {product.name}
                  </p>
                  <p className="font-mono text-xs text-gray-600">
                    image_folder: {folder || '—'}
                  </p>
                </div>

                {/* CASE 1: MATCH FOUND */}
                {images && images.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                    {images.map((img) => (
                      <Image
                        key={img.url}
                        src={img.url}
                        alt={img.path}
                        width={180}
                        height={180}
                        className="rounded object-contain shadow"
                      />
                    ))}
                  </div>
                )}

                {/* CASE 2: NO MATCH */}
                {!images && (
                  <p className="text-sm text-red-600">
                    ❌ No matching storage folder found
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
