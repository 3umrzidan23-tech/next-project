'use server'
import { getAccessToken } from "@/schema/access-token"

export async function ClearCart() {
  const token = await getAccessToken() as string
  if (!token) {
    throw new Error('Unauthorized')
  }

  const response = await fetch(`${process.env.API}/cart`, {
    cache: "no-store",
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const payload = await response.json()
  return payload
}