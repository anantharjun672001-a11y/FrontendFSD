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

        const res = await axios.get("http://backendfsd.onrender.com/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const bookings = res.data;

        setStats({
          total: bookings.length,
          approved: bookings.filter((b) => b.status === "approved").length,
          pending: bookings.filter((b) => b.status === "pending").length,
          rejected: bookings.filter((b) => b.status === "rejected").length,
        });

        setRecent(bookings.slice(-5).reverse());

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
      {/* 🔥 TITLE */}
      <h1 className="text-4xl font-bold text-center mb-14 tracking-wide">
        Admin Dashboard
      </h1>

      {/* 🔥 STATS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        {[
          {
            label: "Total",
            value: stats.total,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "Approved",
            value: stats.approved,
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "Pending",
            value: stats.pending,
            color: "from-yellow-500 to-orange-500",
          },
          {
            label: "Rejected",
            value: stats.rejected,
            color: "from-red-500 to-pink-500",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="relative p-[1px] rounded-xl bg-gradient-to-r hover:scale-105 transition duration-300"
          >
            <div className="bg-[#121826] p-6 rounded-xl text-center backdrop-blur-lg">
              <h2 className="text-gray-400 mb-2">{item.label}</h2>
              <p className="text-3xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 CHART */}
      <div className="bg-[#121826] p-6 rounded-2xl mb-14 border border-gray-700 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Monthly Revenue</h2>
          <span className="text-sm text-gray-400">Last 12 months</span>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#121826",
                border: "1px solid #444",
                color: "#fff",
              }}
              labelStyle={{ color: "#aaa" }}
            />

            <Bar dataKey="income" fill="#8b5cf6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 RECENT BOOKINGS */}
      <div className="bg-[#121826] p-6 rounded-2xl border border-gray-700 shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Recent Bookings</h2>

        <div className="space-y-3">
          {recent.map((b) => (
            <div
              key={b._id}
              className="flex justify-between items-center p-4 rounded-xl bg-[#0f1424] 
              hover:bg-[#1c2233] transition duration-300 hover:shadow-md"
            >
              <div className="max-w-[70%]">
                <p className="font-medium truncate">{b.service}</p>
                <p className="text-gray-400 text-sm">
                  {new Date(b.date).toLocaleDateString()}
                </p>
              </div>

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
      </div>
    </div>
  );
};

export default AdminDashboard;
