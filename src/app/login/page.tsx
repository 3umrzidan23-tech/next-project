// 'use client'
// import React, { useState } from 'react'
// import { useSearchParams } from 'next/navigation'
// import { useForm, Controller } from 'react-hook-form'
// import { signIn } from 'next-auth/react'
// import toast from 'react-hot-toast'
// import { Input } from '@/components/ui/input'
// import { Field, FieldLabel, FieldError } from '@/components/ui/field'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { loginSchema } from '@/schema/loginSchema'

// export default function LoginPage() {
//   const searchParams = useSearchParams()
//   const callbackUrl = searchParams.get('callback-url') ?? '/'
//   const [isLoading, setIsLoading] = useState(false)

//   const form = useForm({
//     defaultValues: { email: '', password: '' },
//     resolver: zodResolver(loginSchema),
//     mode: 'onBlur'
//   })

//   async function submitForm(values: any) {
//     setIsLoading(true)
//     const response = await signIn('credentials', {
//       email: values.email,
//       password: values.password,
//       redirect: false,
//       callbackUrl
//     })

//     if (response?.ok) {
//       toast.success('Login Successful!')
//       window.location.href = response.url || '/'
//     } else {
//       toast.error('Invalid email or password')
//     }

//     setIsLoading(false)
//   }

//   return (
//     <div className="w-1/2 mx-auto mt-5 p-4 bg-gray-300">
//       <h2 className="text-2xl font-bold text-center text-green-600">Login</h2>
//       <form onSubmit={form.handleSubmit(submitForm)} className="mt-4">
//         <Controller
//           name="email"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid} className="mt-2">
//               <FieldLabel htmlFor={field.name}>Email:</FieldLabel>
//               <Input {...field} placeholder="Enter your email" />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />
//         <Controller
//           name="password"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid} className="mt-2">
//               <FieldLabel htmlFor={field.name}>Password:</FieldLabel>
//               <Input type="password" {...field} placeholder="Enter your password" />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full mt-5 p-2 font-bold text-white rounded-md bg-emerald-600"
//         >
//           {isLoading ? 'Loading...' : 'Submit'}
//         </button>
//       </form>
//     </div>
//   )
// }
import React, { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="w-1/2 mx-auto mt-5 p-4 bg-gray-300">
      <h2 className="text-2xl font-bold text-center text-green-600">Login</h2>
      <Suspense fallback={<p>Loading login form...</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}