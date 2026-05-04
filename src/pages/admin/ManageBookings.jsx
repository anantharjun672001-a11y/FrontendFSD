import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageBookings = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6; 
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const res = await axios.get(
      "https://backendfsd.onrender.com/api/bookings",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const sorted = res.data.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setData(sorted);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // UPDATED FUNCTION (instant UI + toast)
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://backendfsd.onrender.com/api/bookings/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // instant UI update (no refresh feel)
      setData((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status } : item
        )
      );

      // toast message
      toast.success(`Booking ${status} successfully`);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  // FILTER + SEARCH
  const filteredData = data
    .filter((b) =>
      filter === "all" ? true : b.status === filter
    )
    .filter((b) =>
      b.service.toLowerCase().includes(search.toLowerCase())
    );

  // PAGINATION
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-28">
      
      <h2 className="text-3xl font-bold text-center mb-10">
        All Bookings
      </h2>

      {/* SEARCH */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search service..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); 
          }}
          className="w-full max-w-md p-3 rounded bg-[#121826] border border-gray-600 outline-none"
        />
      </div>

      {/* FILTER */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {["all", "approved", "rejected", "cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full transition ${
              filter === f
                ? "bg-gradient-to-r from-purple-500 to-pink-500"
                : "bg-[#121826] border border-gray-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData.map((b) => (
          <div
            key={b._id}
            className="bg-[#121826] p-5 rounded-2xl shadow-lg border border-gray-700 
            transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-lg font-semibold">
              {b.service}
            </h3>

            <p className="text-gray-400 mt-1">
              {new Date(b.date).toLocaleDateString()}
            </p>

            {/* STATUS */}
            <div className="mt-3">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  b.status === "approved"
                    ? "bg-green-500"
                    : b.status === "rejected"
                    ? "bg-red-500"
                    : b.status === "cancelled"
                    ? "bg-gray-500"
                    : "bg-yellow-500"
                }`}
              >
                {b.status}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-5">
              {b.status === "approved" ? (
                <div className="flex-1 bg-green-500 text-center py-2 rounded">
                  Approved
                </div>
              ) : (
                <button
                  onClick={() => updateStatus(b._id, "approved")}
                  className="flex-1 bg-green-500 py-2 rounded hover:scale-105 transition"
                >
                  Approve
                </button>
              )}

              {b.status === "rejected" ? (
                <div className="flex-1 bg-red-500 text-center py-2 rounded">
                  Rejected
                </div>
              ) : (
                <button
                  onClick={() => updateStatus(b._id, "rejected")}
                  className="flex-1 bg-red-500 py-2 rounded hover:scale-105 transition"
                >
                  Reject
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-10 gap-3 flex-wrap">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1
                ? "bg-purple-500"
                : "bg-[#121826] border border-gray-600"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageBookings;