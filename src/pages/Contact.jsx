import { FaInstagram, FaWhatsapp, FaEnvelope, FaYoutube } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center px-6">

      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl text-center max-w-md w-full">

        <h2 className="text-3xl font-playfair mb-4">
          Get In Touch
        </h2>

        <p className="text-gray-400 mb-8">
          Let’s capture your beautiful moments 
        </p>

        {/* ICONS */}
        <div className="flex justify-center gap-8 text-3xl mb-8">

          <a
            href="https://www.instagram.com/stuartphotography_studio?igsh=ZnBlMDZwcHN0cXZ4"
            target="_blank"
          >
            <FaInstagram className="text-pink-500 hover:scale-125 transition" />
          </a>

          <a href="https://wa.me/918870189856" target="_blank">
            <FaWhatsapp className="text-green-500 hover:scale-125 transition" />
          </a>

          <a href="mailto:Stuartphotography21@gmail.com">
            <FaEnvelope className="text-[#D4AF37] hover:scale-125 transition" />
          </a>

          <a href="https://youtube.com/@stuartphotographystudio?si=yY2Y1wOmNAAmcRFk" target="_blank">

          <FaYoutube className="text-red-500 hover:scale-125 transition" />
        </a>

        </div>

        {/* BUTTON */}
        <a href="https://wa.me/918870189856" target="_blank">
          <button className="bg-green-500 px-6 py-3 rounded-full hover:scale-105 transition">
            Chat on WhatsApp
          </button>
        </a>

      </div>

    </div>
  );
};

export default Contact;