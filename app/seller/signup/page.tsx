"use client";

import { signup } from "@/app/actions/auth";
import { useActionState } from "react";
import Link from "next/link";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[url(/bg.jpg)] bg-cover">
      <div className="backdrop-blur bg-[#fff]/70 w-full h-screen flex items-center justify-center">
        <form
          action={action}
          className="md:min-w-[450px] w-full md:w-max min-h-[600px] p-6 bg-[#fff]/90 backdrop-blur px-6 rounded-[7px] h-max flex flex-col items-center justify-center"
        >
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <div className="flex flex-col  gap-2 mb-4 bg-[#fff]/60 rounded-[6px] px-3 py-2 w-full max-w-[400px]">
            <label
              htmlFor="name"
              className="text-sm font-medium mb-1 text-gray-700"
            >
              Name :<span className="text-red-600 ml-2">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              className="p-2 px-4 text-gray-500 border border-green-300  border-[1px] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {state?.errors?.name && (
              <p className="text-red-500 text-sm">{state.errors.name}</p>
            )}
          </div>
          <div className="flex flex-col  gap-2 mb-4 bg-[#fff]/60 rounded-[6px] px-3 py-2 w-full max-w-[400px]">
            <label
              htmlFor="email"
              className="text-sm font-medium mb-1 text-gray-700"
            >
              Email
              <span className="text-red-600 ml-2">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="p-2 px-4 text-gray-500 border border-green-300  border-[1px] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {state?.errors?.email && (
              <p className="text-red-500 text-sm">{state.errors.email}</p>
            )}
          </div>
          <div className="flex flex-col  gap-2 mb-4 bg-[#fff]/60 rounded-[6px] px-3 py-2 w-full max-w-[400px]">
            <label
              htmlFor="password"
              className="text-sm font-medium mb-1 text-gray-700"
            >
              Password
              <span className="text-red-600 ml-2">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="p-2 px-4 text-gray-500 border border-green-300  border-[1px] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {state?.errors?.password && (
              <div className="text-red-500 text-sm">
                <p>Password must:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {state?.message && (
            <p className="text-red-500 text-sm">{state.message}</p>
          )}
          <button
            disabled={pending}
            type="submit"
            className="w-full max-w-[350px] mb-4 bg-green-800 text-white py-2 rounded-[6px] hover:bg-green-900 transition-colors mt-4 disabled:bg-gray-400 cursor-pointer"
          >
            Sign Up
          </button>
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              href="/seller/login"
              className="text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
