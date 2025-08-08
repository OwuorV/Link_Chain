"use client";

import { login } from "@/app/actions/auth";
import { useActionState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <form action={action} className="flex flex-col gap-4 w-full max-w-md">
        <h1 className="text-2xl font-bold">Sign In</h1>
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
          Sign In
        </button>
        <p className="text-sm">
          Don’t have an account?{" "}
          <Link href="/seller/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
