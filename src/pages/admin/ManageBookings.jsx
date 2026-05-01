import { useEffect, useState } from "react";
import axios from "axios";

const ManageBookings = () => {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/bookings",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchData();
  };

  return (
    <div>
      <h2>All Bookings</h2>

      {data.map((b) => (
        <div key={b._id}>
          <p>{b.service}</p>
          <p>{b.status}</p>

          <button onClick={() => updateStatus(b._id, "approved")}>
            Approve
          </button>

          <button onClick={() => updateStatus(b._id, "rejected")}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageBookings;