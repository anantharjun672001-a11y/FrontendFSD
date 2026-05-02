import { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [data, setData] = useState([]);

  const fetchBookings = async () => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  //  PAYMENT FUNCTION
  const handlePayment = async (booking) => {
    try {
      const token = localStorage.getItem("token");

      // Step 1: Create Razorpay order
      const res = await axios.post(
        "http://localhost:3000/api/payment/create-order",
        {
          amount: booking.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: "rzp_test_SL4hcemGC7pjEC", 
        amount: res.data.amount,
        currency: "INR",
        order_id: res.data.id,

        handler: async function () {
          alert("Payment Successful!");

          // Step 2: Update payment status
          await axios.put(
            `http://localhost:3000/api/bookings/${booking._id}`,
            { paymentStatus: "paid" },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          fetchBookings();
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("Payment error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-24">
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
              className="bg-[#121826] p-5 rounded-2xl shadow-lg border border-gray-700"
            >
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
                    : "bg-yellow-500"
                }`}
              >
                {b.status}
              </span>

              {/* PAYMENT STATUS */}
              {b.paymentStatus === "paid" && (
                <p className="mt-3 text-green-400 font-semibold">
                  Paid ✅
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