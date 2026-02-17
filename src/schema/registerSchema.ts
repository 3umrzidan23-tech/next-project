import * as zod from "zod";

export let schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters"),

    email: zod
      .string()
      .nonempty("Email is required")
      .email("Invalid email"),

    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-zod])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        "Password must contain upper, lower, number and special character"
      ),

    repassword: zod
      .string()
      .nonempty("Repassword is required"),

    phone: zod
      .string()
      .nonempty("Phone is required")
      .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"), 
  })
  .refine((value) => value.password === value.repassword, {
    message: "Passwords do not match",
    path: ["repassword"],
  });