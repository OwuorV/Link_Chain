"use client";

import { signup } from "@/app/actions/auth";
import { useActionState } from "react";
import Link from "next/link";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <form action={action} className="flex flex-col gap-4 w-full max-w-md">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {state?.errors?.name && (
            <p className="text-red-500 text-sm">{state.errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm">{state.errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
          className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 disabled:bg-gray-400"
        >
          Sign Up
        </button>
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/seller/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
