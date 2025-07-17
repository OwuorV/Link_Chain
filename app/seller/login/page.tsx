"use client";
import { useState } from "react";
import { Form } from "@/app/ui/logins/forms";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setError("Some  fields are Mandatory");
      return;
    }

    // Here you would typically handle the form submission, e.g., send data to an API
    // For demonstration, we'll just log the data to the console
    console.log("Form submitted", formData);
    setError("");
    window.location.href = "/farms";
  };
  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-[20px] py-[10px] bg-gray-100">
      <form
        onSubmit={HandleSubmit}
        className="bg-white p-6 rounded shadow-md w-full h-full max-w-md"
      >
        <div className="flex justify-between mb-6 items-center text-center">
          {" "}
          <h2 className="text-2xl font-bold ">Seller Login</h2>
          <a href="/buyer/login" className="text-green-600 mt-4 underline">
            Login as Buyer{" "}
          </a>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Form
          Name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={HandleChange}
          placeholder="Enter your email"
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
        <button
          type="submit"
          className="w-full mb-5 bg-green-800 text-white py-2 rounded-[24px] hover:bg-blue-600 transition-colors mt-4"
        >
          Log In
        </button>
        Dont have an account?{" "}
        <a href="/seller/signup" className="text-blue-600 mt-4 hover:underline">
          Sign Up
        </a>
      </form>
    </div>
  );
}
