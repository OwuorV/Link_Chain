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
    <div className="flex flex-col items-center justify-center items-center justify-center h-[98vh] w-full bg-[url(/bg.jpg)] bg-cover">
      <div className="backdrop-blur bg-[#fff]/70 w-full h-full flex items-center justify-center">
        <form
          onSubmit={HandleSubmit}
          className=" md:min-w-[450px]  w-full md:w-max min-h-[600px] p-6 bg-[#fff]/90 backdrop-blur px-6 rounded-[7px] h-max flex flex-col items-center"
        >
          <div className="w-full  flex flex-col items-center gap-6">
            <div className="w-full flex justify-end"></div>
            <div className="flex items-center flex-col gap-3 mb-6 items-center max-w-[370px] text-center">
              {" "}
              <h2 className="text-2xl flex font-bold ">Sign In</h2>
            </div>
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
            className="w-full max-w-[350px] mb-4 bg-green-800 text-white py-2 rounded-[6px] hover:bg-greeb-900 transition-colors mt-4"
          >
            Log In
          </button>
          Dont have an account?{" "}
          <a
            href="/seller/signup"
            className="text-blue-600 mt-4 hover:underline"
          >
            Sign Up
          </a>
        </form>
      </div>
    </div>
  );
}
