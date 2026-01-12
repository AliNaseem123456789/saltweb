export default function ProductFeatures() {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <Feature icon="✨" title="Premium Quality">
            Every product is carefully selected and tested to meet our uncompromising standards for purity.
          </Feature>
          <Feature icon="🌿" title="Natural & Pure">
            Sourced directly from Himalayan mines, containing 84 essential trace minerals.
          </Feature>
          <Feature icon="🚚" title="Fast Shipping">
            We deliver your products quickly and safely, ensuring freshness and quality.
          </Feature>
        </div>
      </div>
    </section>
  )
}

function Feature({
  icon,
  title,
  children,
}: {
  icon: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="text-center">
      <div className="mb-4 text-5xl">{icon}</div>
      <h3 className="mb-3 font-serif text-2xl font-light text-slate-800">
        {title}
      </h3>
      <p className="text-slate-600">{children}</p>
    </div>
  )
}
