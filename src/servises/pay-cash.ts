'use server'
import { getAccessToken } from "@/schema/access-token"
import { shipping } from "@/types/cart-response"


export async function payCashOrder(cartId: string, shippingAddress: shipping) {
    const token = await getAccessToken() as string


    if (!token) {
        throw new Error('Unauthorized')
    }

    const response = await fetch(`${process.env.API}/orders/${cartId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shippingAddress
        })
    })

    const payload = await response.json()
    console.log(payload)

    return payload
}