import { useEffect, useState } from "react";
import axios from "axios";

const BookShoot = () => {
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState("");

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/services"
        );
        setServices(res.data);
      } catch (err) {
        console.log("Service fetch error:", err);
      }
    };

    fetchServices();
  }, []);

  // Handle dropdown change
  const handleServiceChange = (e) => {
    const id = e.target.value;
    setSelectedServiceId(id);

    const service = services.find((s) => s._id === id);
    setSelectedService(service);
  };

  //  Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedService || !date) {
      alert("Please select service and date");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/bookings",
        {
          service: selectedService.name,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking created!");
    } catch (err) {
      console.log("Booking error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-[#121826] p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl text-white mb-6 text-center">
          Book a Shoot
        </h2>

        {/* Service Dropdown */}
        <select
          value={selectedServiceId}
          onChange={handleServiceChange}
          className="w-full mb-4 p-3 rounded bg-[#1c2233] text-white outline-none"
        >
          <option value="">Select Service</option>
          {services.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Price Display */}
        {selectedService && (
          <div className="mb-4 text-center text-lg text-green-400 font-semibold">
            Price: ₹{selectedService.price}
          </div>
        )}

        {/* Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-6 p-3 rounded bg-[#1c2233] text-white outline-none"
        />

        {/* Button */}
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookShoot;