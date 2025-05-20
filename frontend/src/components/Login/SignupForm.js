import React, { useState } from "react";
import toast from "react-hot-toast";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    username: "",
    email: "",
  });

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { first_name, username, email } = formData;

    if (!first_name || !username || !email) {
      toast.error("All fields are required.");
      return;
    }

    if (!isEmailValid(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("/api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "Registration failed.");
      } else {
        toast.success(result.message || "Registered successfully!");
        setFormData({ first_name: "", username: "", email: "" });
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    }
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

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Sign Up
      </button>
    </form>
  );
}
