import { useEffect, useState } from "react";
import axios from "axios";

const ManageBookings = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/bookings",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:3000/api/bookings/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchData();
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-24">
      <h2 className="text-3xl font-bold text-center mb-10">
        All Bookings
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((b) => (
          <div
            key={b._id}
            className="bg-[#121826] p-5 rounded-2xl shadow-lg border border-gray-700"
          >
            <h3 className="text-lg font-semibold">{b.service}</h3>

            <p className="text-gray-400 mt-1">
              {new Date(b.date).toLocaleDateString()}
            </p>

            <p className="mt-2">
              Status:{" "}
              <span className="font-semibold">{b.status}</span>
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => updateStatus(b._id, "approved")}
                className="flex-1 bg-green-500 py-2 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(b._id, "rejected")}
                className="flex-1 bg-red-500 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBookings;