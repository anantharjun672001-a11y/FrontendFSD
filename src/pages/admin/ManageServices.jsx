import { useEffect, useState } from "react";
import axios from "axios";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });

  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    const res = await axios.get("http://localhost:3000/api/services");
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAdd = async () => {
    await axios.post(
      "http://localhost:3000/api/services",
      form,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchServices();
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:3000/api/services/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchServices();
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-24">
      <h1 className="text-3xl text-center mb-10">Manage Services</h1>

      {/* ADD FORM */}
      <div className="flex gap-4 justify-center mb-10">
        <input
          placeholder="Service Name"
          className="p-2 bg-gray-800 rounded"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Price"
          type="number"
          className="p-2 bg-gray-800 rounded"
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <button
          onClick={handleAdd}
          className="bg-green-500 px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s._id}
            className="bg-[#121826] p-4 rounded-xl"
          >
            <h2 className="text-lg">{s.name}</h2>
            <p className="text-gray-400">₹{s.price}</p>

            <button
              onClick={() => handleDelete(s._id)}
              className="mt-3 bg-red-500 px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageServices;