import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    const res = await axios.get("http://backendfsd.onrender.com/api/services");
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ADD / UPDATE
  const handleSubmit = async () => {
    if (!form.name || !form.price) {
      toast.error("Fill all fields");
      return;
    }

    try {
      if (editId) {
        // UPDATE
        await axios.put(
          `http://backendfsd.onrender.com/api/services/${editId}`,
          form,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Service updated");
        setEditId(null);
      } else {
        // ADD
        await axios.post(
          "http://backendfsd.onrender.com/api/services",
          form,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Service added");
      }

      setForm({ name: "", price: "" });
      fetchServices();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    await axios.delete(
      `http://backendfsd.onrender.com/api/services/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success("Deleted");
    fetchServices();
  };

  // EDIT LOAD
  const handleEdit = (service) => {
    setForm({
      name: service.name,
      price: service.price,
    });
    setEditId(service._id);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-28">
      
      <h1 className="text-3xl text-center mb-12 font-bold">
        Manage Services
      </h1>

      {/* FORM */}
      <div className="max-w-2xl mx-auto bg-[#121826] p-6 rounded-2xl shadow-lg mb-12 border border-gray-700">
        
        <h2 className="text-xl mb-4 text-center">
          {editId ? "Edit Service" : "Add Service"}
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          
          <input
            placeholder="Service Name"
            value={form.name}
            className="flex-1 p-3 rounded-lg bg-[#1c2233] border border-gray-600 outline-none focus:border-purple-500 transition"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Price"
            type="number"
            value={form.price}
            className="flex-1 p-3 rounded-lg bg-[#1c2233] border border-gray-600 outline-none focus:border-purple-500 transition"
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition"
        >
          {editId ? "Update Service" : "Add Service"}
        </button>
      </div>

      {/* 🔥 SERVICE CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s._id}
            className="bg-[#121826] p-5 rounded-2xl border border-gray-700 shadow-lg 
            transition duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-purple-500"
          >
            <h2 className="text-xl font-semibold mb-2">
              {s.name}
            </h2>

            <p className="text-green-400 text-lg font-medium">
              ₹{s.price}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-5">
              
              <button
                onClick={() => handleEdit(s)}
                className="flex-1 py-2 rounded-lg bg-blue-500 hover:scale-105 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(s._id)}
                className="flex-1 py-2 rounded-lg bg-red-500 hover:scale-105 transition"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageServices;