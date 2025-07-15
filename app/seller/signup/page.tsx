"use client";
import { useState } from "react";
import { Form } from "@/app/ui/logins/forms";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("/api/seller/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      // Redirect on success
      window.location.href = "/seller/login";
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-[20px] py-[10px] bg-gray-100">
      <form
        onSubmit={HandleSubmit}
        className="bg-white p-6 rounded shadow-md w-full h-full max-w-md"
      >
        <div className="flex justify-between mb-6 items-center text-center">
          {" "}
          <h2 className="text-2xl font-bold ">Seller Signup</h2>
          <a href="/buyer/signup" className="text-green-600 mt-4 underline">
            Register as Buyer{" "}
          </a>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Form
          Name="name"
          label="Name"
          type="text"
          value={formData.name}
          onChange={HandleChange}
          placeholder="Enter your name"
          required
        />
        <Form
          Name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={HandleChange}
          placeholder="Enter your email"
        />
        <Form
          Name="phone"
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={HandleChange}
          placeholder="Enter your phone number"
        />
        <Form
          Name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={HandleChange}
          placeholder="Enter your password"
          required
          minLength={8}
        />
        <Form
          Name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={HandleChange}
          placeholder="Confirm your password"
          required
          minLength={8}
        />
        <button
          type="submit"
          className="w-full mb-4 bg-green-800 text-white py-2 rounded-[24px] hover:bg-blue-600 transition-colors mt-4"
        >
          Sign Up
        </button>
        Have an account?{" "}
        <a href="/seller/login" className="text-blue-600 mt-4 hover:underline">
          Login
        </a>
      </form>
    </div>
  );
}
