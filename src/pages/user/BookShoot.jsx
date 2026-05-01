import { useState } from "react";
import axios from "axios";

const BookShoot = () => {
  const [form, setForm] = useState({
    service: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/bookings",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking created!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#121826] p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl text-white mb-6 text-center">
          Book a Shoot
        </h2>

        <input
          placeholder="Service (Wedding, Outdoor...)"
          className="w-full mb-4 p-3 rounded bg-[#1c2233] text-white outline-none"
          onChange={(e) =>
            setForm({ ...form, service: e.target.value })
          }
        />

        <input
          type="date"
          className="w-full mb-6 p-3 rounded bg-[#1c2233] text-white outline-none"
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookShoot;