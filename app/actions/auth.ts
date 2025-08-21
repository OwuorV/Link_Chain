"use server";

import { SignupFormSchema, FormState } from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    console.log(
      "Signup validation failed:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    console.log("Creating user:", email);

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return {
        message: "An account with this email already exists.",
      };
    }

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: { id: true },
    });

    if (!user) {
      console.error("User creation failed: No user returned");
      return {
        message: "An error occurred while creating your account.",
      };
    }

    console.log("User created with ID:", user.id);
    await createSession(user.id);
    console.log("Session created successfully for signup");
  } catch (error: any) {
    console.error("Signup error:", error);

    // Handle unique constraint violations
    if (error.code === "P2002") {
      return {
        message: "An account with this email already exists.",
      };
    }

    return {
      message: "An error occurred while creating your account.",
    };
  }

  // Redirect outside of try-catch
  redirect("/farms");
}

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    console.log(
      "Login validation failed:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    console.log("Logging in user:", email);
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    });

    if (!user || !user.password) {
      console.error("Login failed: User not found or no password");
      return {
        message: "Invalid email or password.",
      };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      console.error("Login failed: Invalid password");
      return {
        message: "Invalid email or password.",
      };
    }

    console.log("User logged in with ID:", user.id);
    await createSession(user.id);
    console.log("Session created successfully for login");
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      message: "An error occurred while logging in.",
    };
  }

  // Redirect outside of try-catch
  redirect("/farms");
}

export async function logout() {
  try {
    console.log("Logging out user");
    await deleteSession();
  } catch (error) {
    console.error("Logout error:", error);
    // Continue with redirect even if session deletion fails
  }

  redirect("/seller/login");
}
