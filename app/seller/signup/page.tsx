"use client";
import { useState } from "react";
import { Form } from "@/app/ui/logins/forms";
import Image from "next/image";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",

    password: "",
  });
  const [error, setError] = useState("");
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await fetch("/api/seller/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
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
    <div className="grid grid-cols-1 md:grid-cols-2  items-center justify-center h-[98vh] w-full bg-[url(/bg.jpg)] bg-cover">
      <div className="div w-full h-full hidden md:block  md:w-full overflow-hidden mx-auto relative mt-4">
        <Image src="/bg.jpg" alt="Logo" fill className="object-cover" />
      </div>

      <form
        onSubmit={HandleSubmit}
        className=" w-full bg-[#fff]/90 backdrop-blur px-2 h-full flex flex-col items-center"
      >
        <div className="w-full  flex flex-col items-center gap-6">
          <div className="w-full flex justify-end">
            <a href="/buyer/signup" className="text-green-600 mt-4 underline">
              Register as Buyer{" "}
            </a>
          </div>
          <div className="flex items-center flex-col gap-3 mb-6 items-center max-w-[370px] text-center">
            {" "}
            <h2 className="text-2xl flex font-bold ">Create Your Account</h2>
            <p className="text-gray-400">
              Join many local farmers, extension service officers and explore a
              vast market place of ready buyers
            </p>
          </div>
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
          className="w-full max-w-[350px] mb-4 bg-green-800 text-white py-2 rounded-[6px] hover:bg-greeb-900 transition-colors mt-4"
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
