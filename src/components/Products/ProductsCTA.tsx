import Link from 'next/link'

export default function ProductsCTA() {
  return (
    <section className="bg-[#EAE9E3] px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 font-serif text-4xl font-light text-slate-800 md:text-5xl">
          Can&apos;t Find What You&apos;re Looking For?
        </h2>
        <p className="mb-8 text-lg text-slate-600">
          Contact us and we&apos;ll help you find the perfect Himalayan salt product for your needs.
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-lg bg-[#CE978C] px-10 py-4 font-sans text-lg font-medium text-white transition-all hover:bg-[#B8857A] hover:shadow-lg"
        >
          Contact Us
        </Link>
      </div>
    </section>
  )
}
