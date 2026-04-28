import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-playfair font-bold"
      >
        Stuart Photography
      </motion.h1>

      {/* TAGLINE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-gray-300 font-poppins"
      >
        Capturing your best moments
      </motion.p>

      {/* BUTTONS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex gap-4 mt-6"
      >
        <Link to="/landing">
          <button className="bg-[#D4AF37] text-black px-6 py-3 rounded-full hover:scale-105 transition">
            Explore Gallery
          </button>
        </Link>
      </motion.div>

      {/* PREVIEW IMAGES */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex gap-4 mt-10"
      >
        <img src="/images/b1.jpeg" className="w-24 h-24 object-cover rounded-lg hover:scale-110 transition" />
        <img src="/images/b2.jpeg" className="w-24 h-24 object-cover rounded-lg hover:scale-110 transition" />
        <img src="/images/d1.jpeg" className="w-24 h-24 object-cover rounded-lg hover:scale-110 transition" />
      </motion.div>

    </div>
  );
};

export default Home;