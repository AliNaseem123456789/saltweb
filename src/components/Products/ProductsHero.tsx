"use client";
import ReactPlayer from "react-player";

export default function ProductsHero() {
  return (
    <section className="relative h-[50vh] w-full overflow-hidden bg-[#B8857A]">
      <div className="absolute inset-0 z-0">
        <ReactPlayer
          url="https://m.media-amazon.com/images/S/vse-vms-transcoding-artifact-us-east-1-prod/bc50fd9b-0393-44f9-a8de-158d807bddbc/default.jobtemplate.hls1080.m3u8"
          playing
          loop
          muted
          playsinline
          width="100%"
          height="100%"
          // Important for background behavior:
          style={{ objectFit: "cover" }}
          config={{
            file: {
              attributes: {
                style: {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                },
              },
            },
          }}
        />
        {/* Overlay for Readability */}
        <div className="absolute inset-0 z-10 bg-black/40" />
      </div>

      {/* --- Text Content --- */}
      <div className="relative z-20 flex h-full items-center justify-center text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-6 font-serif text-5xl font-light tracking-tight text-white drop-shadow-2xl md:text-6xl lg:text-7xl">
            Our Products
          </h1>
          <p className="text-xl text-white/90 drop-shadow-lg md:text-2xl">
            Discover our complete collection of premium Himalayan salt products
          </p>
        </div>
      </div>
    </section>
  );
}
