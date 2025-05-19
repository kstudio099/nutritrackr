// src/components/SignupForm.jsx
import { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    username: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    setMessage(result.message);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow rounded bg-white">
      <h2 className="text-xl mb-4">Create Your Account</h2>
      
      <input
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        required
        className="block w-full mb-3 p-2 border rounded"
      />
      <input
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
        className="block w-full mb-3 p-2 border rounded"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="block w-full mb-3 p-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </form>
  );
}
