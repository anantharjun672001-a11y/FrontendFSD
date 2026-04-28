import { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registered (dummy for now)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded-lg w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input name="name" placeholder="Name" className="w-full border p-2 mb-3" onChange={handleChange} />
        <input name="email" placeholder="Email" className="w-full border p-2 mb-3" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="w-full border p-2 mb-3" onChange={handleChange} />

        <button className="w-full bg-black text-white py-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;