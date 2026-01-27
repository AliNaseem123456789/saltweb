// "use client";
// import { motion } from "framer-motion";
// import AnimatedSection from "@/components/AnimatedSection";
// import { certifications } from "@/data/certifications";

// export default function Certifications() {
//   return (
//     // <AnimatedSection className="border-y border-slate-200 bg-white px-4 py-16">
//     <div className="mx-auto max-w-7xl bg-[#FAF8F5]">
//       <motion.h2
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//         className="mb-12 text-center font-serif text-3xl font-light text-slate-800 md:text-4xl"
//       >
//         Our Trusted Quality Certification
//       </motion.h2>
//       <div className="flex flex-wrap items-center justify-center gap-12 ">
//         {certifications.map((cert, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             whileHover={{ scale: 1.1 }}
//             className="flex flex-col items-center gap-3"
//           >
//             <div className="text-5xl">{cert.logo}</div>
//             <span className="text-base font-medium text-slate-700">
//               {cert.name}
//             </span>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//     // </AnimatedSection>
//   );
// }
