import { z } from "zod";

// Register Schema
export const registerSchema = z.object({
  name: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username should be of type string",
    })
    .min(2, { message: "username should be at least 2 characters long" })
    .max(200, { message: "username should be less than 200 characters" }),
  email: z.string().min(3).max(200).email(),
  password: z.string().min(6),
});

// Login Schema
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(3)
    .max(200)
    .email(),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6),
});
