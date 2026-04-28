import { motion } from "framer-motion";

const Intro = () => {
  return (
    <div className="bg-[#0B0F19] text-white py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#D4AF37] uppercase tracking-widest text-sm font-poppins"
        >
          Welcome to
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-playfair font-bold mt-3"
        >
          Stuart Photography
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 text-gray-300 font-poppins leading-relaxed"
        >
          “We believe every wedding has a unique story to tell. Our team
          captures your emotions, real moments, and unforgettable memories as
          they unfold naturally. From laughter to tears, we frame every feeling
          with care. We don’t just take photos, we create memories. Our wedding
          crew captures your big day with a perfect mix of candid moments and
          cinematic style. Hire us to relive your special day forever.”
        </motion.p>
      </div>
    </div>
  );
};

export default Intro;
