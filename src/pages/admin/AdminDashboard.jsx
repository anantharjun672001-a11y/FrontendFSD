import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const [recent, setRecent] = useState([]);
  const [chartData, setChartData] = useState([]);

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

        // STATS
        setStats({
          total: bookings.length,
          approved: bookings.filter(b => b.status === "approved").length,
          pending: bookings.filter(b => b.status === "pending").length,
          rejected: bookings.filter(b => b.status === "rejected").length,
        });

        setRecent(bookings.slice(-5).reverse());

        //  CHART LOGIC
        const monthlyData = {};

        bookings.forEach((b) => {
          if (b.status === "approved") {
            const date = new Date(b.date);
            const month = date.toLocaleString("default", {
              month: "short",
            });

            if (!monthlyData[month]) {
              monthlyData[month] = 0;
            }

            monthlyData[month] += b.price || 0;
          }
        });

        const formatted = Object.keys(monthlyData).map((month) => ({
          month,
          income: monthlyData[month],
        }));

        setChartData(formatted);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-28">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-12">
        Admin Dashboard
      </h1>

      {/* STATS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

        <div className="bg-[#121826] p-6 rounded-xl text-center hover:scale-105 transition">
          <h2 className="text-gray-400">Total</h2>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-green-500/20 p-6 rounded-xl text-center hover:scale-105 transition">
          <h2>Approved</h2>
          <p className="text-3xl font-bold">{stats.approved}</p>
        </div>

        <div className="bg-yellow-500/20 p-6 rounded-xl text-center hover:scale-105 transition">
          <h2>Pending</h2>
          <p className="text-3xl font-bold">{stats.pending}</p>
        </div>

        <div className="bg-red-500/20 p-6 rounded-xl text-center hover:scale-105 transition">
          <h2>Rejected</h2>
          <p className="text-3xl font-bold">{stats.rejected}</p>
        </div>

      </div>

      {/*  CHART SECTION */}
      <div className="bg-[#121826] p-6 rounded-xl mb-12">
        <h2 className="text-xl mb-6">Monthly Revenue </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="income" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/*  RECENT BOOKINGS */}
      <div className="bg-[#121826] p-6 rounded-xl">

        <h2 className="text-xl mb-4">Recent Bookings</h2>

        {recent.map((b) => (
          <div
            key={b._id}
            className="flex justify-between items-center border-b border-gray-700 py-3 hover:bg-[#1c2233] px-3 py-2 rounded-lg transition"
          >
            <div className="max-w-[70%]">
              <p className="font-medium truncate">{b.service}</p>
              <p className="text-gray-400 text-sm">
                {new Date(b.date).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
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
    </div>
  );
};

export default AdminDashboard;