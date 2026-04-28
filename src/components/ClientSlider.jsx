import { motion } from "framer-motion";

const images = [
  "/images/girl12.jpeg",
  "/images/girl4.jpeg",
  "/images/raju.jpeg",
  "/images/girl18.jpeg",
  "/images/girl20.jpeg",
  "/images/raju3.jpeg",
];

const ClientSlider = () => {
  return (
    <div className="bg-[#111827] py-24 px-6 overflow-hidden">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-center text-white text-4xl md:text-5xl font-playfair mb-12">
          Freezing Frames
        </h2>

        <div className="relative overflow-hidden">

          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {[...images, ...images].map((img, index) => (
              <div key={index} className="min-w-[260px] h-[320px] rounded-xl overflow-hidden">
                <img
                  src={img}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ClientSlider;