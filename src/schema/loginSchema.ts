import * as zod from "zod";

export let loginSchema = zod
  .object({

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
   
  })
  