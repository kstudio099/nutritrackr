import { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    username: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isEmailValid = (email) => {
    // Validation simple de l'email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Réinitialise les erreurs lors de la saisie
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { first_name, username, email } = formData;

    if (!first_name || !username || !email) {
      setError("All fields are required.");
      return;
    }

    if (!isEmailValid(email)) {
      setError("Please enter a valid email address.");
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
        setError(result.message || "Registration failed.");
      } else {
        setMessage(result.message);
        setFormData({ first_name: "", username: "", email: "" }); // reset
      }
    } catch (err) {
      setError("An unexpected error occurred.");
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

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </form>
  );
}
