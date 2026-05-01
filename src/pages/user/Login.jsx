import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await axios.post("http://localhost:3000/api/auth/login", form);

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  if (res.data.user.role === "admin") {
    navigate("/admin/dashboard");
  } else {
    navigate("/");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded-lg w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />

        <button className="w-full bg-black text-white py-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;