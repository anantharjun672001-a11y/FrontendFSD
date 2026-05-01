import { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/bookings/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data);
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>

      {data.map((b) => (
        <div key={b._id}>
          <p>{b.service}</p>
          <p>{b.date}</p>
          <p>{b.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;