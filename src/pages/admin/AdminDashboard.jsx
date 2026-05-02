import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const bookings = res.data;

        setStats({
          total: bookings.length,
          approved: bookings.filter(b => b.status === "approved").length,
          pending: bookings.filter(b => b.status === "pending").length,
          rejected: bookings.filter(b => b.status === "rejected").length,
        });

        setRecent(bookings.slice(-5).reverse());
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-28">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-12 tracking-wide">
        Admin Dashboard
      </h1>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

        {/* CARD */}
        <div className="bg-[#121826] p-6 rounded-xl text-center 
          hover:scale-105 hover:shadow-lg transition duration-300 cursor-pointer">
          <h2 className="text-gray-400">Total</h2>
          <p className="text-3xl font-bold mt-2">{stats.total}</p>
        </div>

        <div className="bg-green-500/20 p-6 rounded-xl text-center 
          hover:scale-105 hover:shadow-green-500/20 hover:shadow-lg transition duration-300 cursor-pointer">
          <h2>Approved</h2>
          <p className="text-3xl font-bold mt-2">{stats.approved}</p>
        </div>

        <div className="bg-yellow-500/20 p-6 rounded-xl text-center 
          hover:scale-105 hover:shadow-yellow-500/20 hover:shadow-lg transition duration-300 cursor-pointer">
          <h2>Pending</h2>
          <p className="text-3xl font-bold mt-2">{stats.pending}</p>
        </div>

        <div className="bg-red-500/20 p-6 rounded-xl text-center 
          hover:scale-105 hover:shadow-red-500/20 hover:shadow-lg transition duration-300 cursor-pointer">
          <h2>Rejected</h2>
          <p className="text-3xl font-bold mt-2">{stats.rejected}</p>
        </div>

      </div>

      {/* 🔥 RECENT BOOKINGS */}
      <div className="bg-[#121826] p-6 rounded-xl shadow-md">

        <h2 className="text-xl mb-6 font-semibold tracking-wide">
          Recent Bookings
        </h2>

        {recent.length === 0 ? (
          <p className="text-gray-400">No data</p>
        ) : (
          <div className="space-y-4">
            {recent.map((b) => (
              <div
                key={b._id}
                className="flex justify-between items-center border-b border-gray-700 pb-3 
                hover:bg-[#1c2233] px-3 py-2 rounded-lg transition"
              >
                {/* LEFT */}
                <div className="max-w-[70%]">
                  
                  {/* 🔥 FIX TEXT CUT */}
                  <p className="font-medium truncate">
                    {b.service}
                  </p>

                  <p className="text-gray-400 text-sm">
                    {new Date(b.date).toLocaleDateString()}
                  </p>
                </div>

                {/* STATUS */}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    b.status === "approved"
                      ? "bg-green-500"
                      : b.status === "rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;