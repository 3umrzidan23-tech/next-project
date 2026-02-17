'use server'
import { getAccessToken } from "@/schema/access-token"
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function addToCart(productId: string) {
    const token = await getAccessToken() as string


    if (!token) {
        throw new Error('Unauthorized')
    }

    const response = await fetch(`${process.env.API}/cart`, {
        cache: "no-store",
        method: 'POST',
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