'use client'
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { schema } from "@/schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as zod from "zod";



export default function Register() {
  const form = useForm({
    defaultValues : {
      name :'',
      email :'',
      password :'',
      repassword :'',
      phone :'',
    } , 
    resolver:zodResolver(schema),
    mode : 'onBlur'

  })

  function submitForm(values : zod.infer<typeof schema>){
    console.log(values);
    window.location.href = "/";

  }
  return <>
      <div className="w-1/2 mx-auto p-4 bg-gray-300 mt-5">
      <h2 className="text-green-600 font-bold text-2xl text-center">Register Now</h2>
        <form onSubmit={form.handleSubmit(submitForm)}>

          <div className="mt-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Name : </FieldLabel>
                  <Input
                  className="bg-white "
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email : </FieldLabel>
                  <Input
                  className="bg-white "
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-4">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password : </FieldLabel>
                  <Input
                  className="bg-white "
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-4">
            <Controller
              name="repassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>rePassword : </FieldLabel>
                  <Input
                  className="bg-white "
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your repassword"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-4">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>phone : </FieldLabel>
                  <Input
                  className="bg-white "
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your phone"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <button type="submit" className="p-2 my-5 w-full bg-emerald-600 border font-bold text-white ">Submit</button>
        


        </form>
      </div>
    </>
}
