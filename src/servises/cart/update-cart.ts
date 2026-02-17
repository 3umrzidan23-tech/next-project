'use server'
import { getAccessToken } from "@/schema/access-token"
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function UpdayeCartItem({ productId, count }: { productId: string, count: number }) {
    const token = await getAccessToken() as string


    if (!token) {
        throw new Error('Unauthorized')
    }

    const response = await fetch(`${process.env.API}/cart/${productId}`, {
        cache: "no-store",
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productId
        })
    })

    const payload = await response.json()
    console.log(payload)

    return payload
}