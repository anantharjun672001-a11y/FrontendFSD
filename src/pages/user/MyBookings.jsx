import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MyBookings = () => {
  const [data, setData] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://backendfsd.onrender.com/api/bookings/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data);
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    
    fetchBookings();
  }, []);

  // PAYMENT
  const handlePayment = async (booking) => {
    try {
      const token = localStorage.getItem("token");

      const { data: order } = await axios.post(
        "http://backendfsd.onrender.com/api/payment/create-order",
        { amount: booking.price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: "rzp_test_SL4hcemGC7pjEC",
        amount: order.amount,
        currency: "INR",
        name: "Stuart Photography",
        description: booking.service,
        order_id: order.id,

        handler: async function () {
          await axios.put(
            `http://backendfsd.onrender.com/api/bookings/payment/${booking._id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          toast.success("Payment successful");

          fetchBookings();
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("Payment error:", err);
      toast.error("Payment failed");
    }
  };
  

  // CANCEL BOOKING
  const handleCancel = async (id) => {
    const confirm = window.confirm("Cancel this booking?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://backendfsd.onrender.com/api/bookings/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // remove from UI instantly
      setData((prev) => prev.filter((b) => b._id !== id));
      toast.success("Booking cancelled");
    } catch (err) {
      console.log("Cancel error:", err);
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-28">
      <h2 className="text-3xl font-bold text-center mb-10">
        My Bookings
      </h2>

      {data.length === 0 ? (
        <p className="text-center text-gray-400">
          No bookings yet
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((b) => (
            <div
              key={b._id}
              className="relative bg-[#121826] p-5 rounded-2xl shadow-lg border border-gray-700 transition transform hover:scale-105 hover:shadow-2xl"
            >
              {/* CANCEL BUTTON (TOP RIGHT) */}
              {(b.paymentStatus !== "paid" &&
                b.status !== "rejected") && (
                <button
                  onClick={() => handleCancel(b._id)}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-lg"
                >
                  ✕
                </button>
              )}

              <h3 className="text-xl font-semibold mb-2">
                {b.service}
              </h3>

              <p className="text-gray-400">
                {new Date(b.date).toLocaleDateString()}
              </p>

              {/* STATUS */}
              <span
                className={`inline-block mt-3 px-3 py-1 text-sm rounded-full ${
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

              {/* PAYMENT */}
              {b.paymentStatus === "paid" && (
                <p className="mt-3 text-green-400 font-semibold">
                  Paid 
                </p>
              )}

              {/* PAY BUTTON */}
              {b.status === "approved" &&
                b.paymentStatus !== "paid" && (
                  <button
                    onClick={() => handlePayment(b)}
                    className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition"
                  >
                    Pay Now
                  </button>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;