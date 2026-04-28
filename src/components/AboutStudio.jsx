import { motion } from "framer-motion";

const AboutStudio = () => {
  return (
    <div className="bg-[#0B0F19] text-white py-24 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#D4AF37] uppercase tracking-widest text-sm font-poppins">
            About Studio
          </p>

          <h2 className="text-3xl md:text-5xl font-playfair font-bold mt-3">
            Crafting Timeless Stories
          </h2>

          <p className="mt-6 text-gray-300 font-poppins leading-relaxed">
            At Stuart Photography, we specialize in capturing life’s most beautiful moments 
            with a blend of creativity and precision. From cinematic drone shots to 
            traditional and candid photography, every frame is crafted to tell your story.
          </p>

          <p className="mt-4 text-gray-400 font-poppins">
            Our team ensures premium quality in both photography and videography, delivering 
            visuals that feel natural, emotional, and unforgettable.
          </p>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 gap-6"
        >
          <div className="bg-black/40 p-6 rounded-xl text-center hover:scale-105 transition">
            <h3 className="text-[#D4AF37] font-bold">Drone Shots</h3>
            <p className="text-gray-400 text-sm mt-2">Aerial cinematic views</p>
          </div>

          <div className="bg-black/40 p-6 rounded-xl text-center hover:scale-105 transition">
            <h3 className="text-[#D4AF37] font-bold">Traditional</h3>
            <p className="text-gray-400 text-sm mt-2">Classic coverage</p>
          </div>

          <div className="bg-black/40 p-6 rounded-xl text-center hover:scale-105 transition">
            <h3 className="text-[#D4AF37] font-bold">Candid</h3>
            <p className="text-gray-400 text-sm mt-2">Natural moments</p>
          </div>

          <div className="bg-black/40 p-6 rounded-xl text-center hover:scale-105 transition">
            <h3 className="text-[#D4AF37] font-bold">Premium Video</h3>
            <p className="text-gray-400 text-sm mt-2">High-end visuals</p>
          </div>
        </motion.div>

      </div>

    </div>
  );
};

export default AboutStudio;