import { FaInstagram, FaWhatsapp, FaEnvelope , FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      id="contact"
      className="bg-[#111827] text-white py-16 px-6 text-center"
    >
      {/* TITLE */}
      <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
        Get In Touch
      </h2>

      <p className="text-gray-400 font-poppins mb-8">
        Let’s capture your beautiful moments together ✨
      </p>

      {/* CONTACT ICONS */}
      <div className="flex justify-center gap-8 text-3xl mb-8">

        {/* Instagram */}
        <a
          href="https://www.instagram.com/stuartphotography_studio?igsh=ZnBlMDZwcHN0cXZ4"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition"
        >
          <FaInstagram className="text-pink-500" />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/918870189856"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition"
        >
          <FaWhatsapp className="text-green-500" />
        </a>

        {/* Email */}
        <a
          href="mailto:Stuartphotography21@gmail.com"
          className="hover:scale-110 transition"
        >
          <FaEnvelope className="text-[#D4AF37]" />
        </a>

        {/* YouTube */}
        <a
          href="https://youtube.com/@stuartphotographystudio?si=yY2Y1wOmNAAmcRFk"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition"
        >
          <FaYoutube className="text-red-500" />
        </a>

      </div>

      {/* DETAILS */}
      <div className="text-gray-400 font-poppins space-y-2">
        <p>📞 +91 88701 89856</p>
        <p>📧 Stuartphotography21@gmail.com</p>
      </div>

      {/* BOTTOM */}
      <div className="mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Stuart Photography. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;