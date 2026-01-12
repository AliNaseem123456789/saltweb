export default function ProductsHero() {
  return (
    <section className="relative h-[50vh] w-full overflow-hidden bg-gradient-to-br from-[#CE978C] to-[#B8857A]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="mx-auto max-w-4xl text-center px-4">
          <h1 className="mb-6 font-serif text-5xl font-light tracking-tight text-white md:text-6xl lg:text-7xl">
            Our Products
          </h1>
          <p className="text-xl text-white/90 md:text-2xl">
            Discover our complete collection of premium Himalayan salt products
          </p>
        </div>
      </div>
    </section>
  )
}
