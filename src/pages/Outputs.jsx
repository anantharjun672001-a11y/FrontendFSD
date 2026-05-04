import { useState } from "react";

const images = [
  { src: "/images/1.jpg", category: "wedding" },
  { src: "/images/2.jpg", category: "wedding" },
  { src: "/images/3.jpg", category: "baby" },
  { src: "/images/4.jpg", category: "baby" },
  { src: "/images/5.jpg", category: "outdoor" },
  { src: "/images/6.jpg", category: "outdoor" },
  { src: "/images/7.jpg", category: "wedding" },
  { src: "/images/8.jpg", category: "baby" },
  { src: "/images/9.jpg", category: "outdoor" },
  { src: "/images/10.jpg", category: "wedding" },
  { src: "/images/11.jpg", category: "baby" },
  { src: "/images/12.jpg", category: "outdoor" },
  { src: "/images/13.jpg", category: "wedding" },
  { src: "/images/14.jpg", category: "baby" },
  { src: "/images/15.jpg", category: "outdoor" },
  { src: "/images/16.jpg", category: "wedding" },
  { src: "/images/17.jpg", category: "baby" },
  { src: "/images/18.jpg", category: "outdoor" },
  { src: "/images/19.jpg", category: "wedding" },
  { src: "/images/20.jpg", category: "wedding" },
];

const Outputs = () => {
  const [filter, setFilter] = useState("all");

  const filteredImages =
    filter === "all"
      ? images
      : images.filter((img) => img.category === filter);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-28">
      
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-10">
        Our Work
      </h1>

      {/* 🔥 FILTER */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {["all", "wedding", "baby", "outdoor"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full transition ${
              filter === f
                ? "bg-gradient-to-r from-purple-500 to-pink-500"
                : "bg-[#121826] border border-gray-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 🔥 IMAGE GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((img, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl group cursor-pointer"
          >
            {/* IMAGE */}
            <img
              src={img.src}
              alt="output"
              className="w-full h-64 object-cover transform transition duration-500 group-hover:scale-110"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <p className="text-lg font-semibold capitalize">
                {img.category}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Outputs;