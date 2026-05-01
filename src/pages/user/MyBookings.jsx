import { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:3000/api/bookings/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data);
      } catch (err) {
        console.log("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, []);
  return (
  <div className="p-6 text-white">
    <h2 className="text-xl mb-4">My Bookings</h2>

    {data.length === 0 ? (
      <p>No bookings yet</p>
    ) : (
      data.map((b) => (
        <div key={b._id}>
          <p>{b.service}</p>
          <p>{b.date}</p>
          <p>{b.status}</p>
        </div>
      ))
    )}
  </div>
);
};

export default MyBookings;
