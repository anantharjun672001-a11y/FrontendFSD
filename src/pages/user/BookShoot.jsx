import { useState } from "react";
import axios from "axios";

const BookShoot = () => {
  const [form, setForm] = useState({
    service: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <input
        placeholder="Service"
        onChange={(e) =>
          setForm({ ...form, service: e.target.value })
        }
      />

      <input
        type="date"
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      <button>Book</button>
    </form>
  );
};

export default BookShoot;