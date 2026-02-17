"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/loginSchema";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  async function submitForm(values: LoginFormValues) {
    setIsLoading(true);

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl,
    });

    if (response?.error) {
      toast.error("Invalid email or password");
      setIsLoading(false);
      return;
    }

    toast.success("Login successful!");
    router.push(response?.url || "/");
  }

  return (
    <form onSubmit={form.handleSubmit(submitForm)} className="mt-4">
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="mt-2">
            <FieldLabel htmlFor={field.name}>Email:</FieldLabel>
            <Input {...field} placeholder="Enter your email" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="mt-2">
            <FieldLabel htmlFor={field.name}>Password:</FieldLabel>
            <Input
              type="password"
              {...field}
              placeholder="Enter your password"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-5 p-2 font-bold text-white rounded-md bg-emerald-600"
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
