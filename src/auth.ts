import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { email, json } from "zod";
import { failedLogin, successLogin } from "./types/authInterface";
export const authOption: NextAuthOptions = {
    pages: {
        signIn: '/login'
    },

    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {

                const responce = await fetch(`${process.env.API}/auth/signin`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: {
                        'Content-type': "application/json"
                    }

                })

                const payload: failedLogin | successLogin = await responce.json()
                console.log(payload)


                if ('token' in payload) {
                    return {
                        id: payload.user.email,
                        email: payload.user.email,
                        name: payload.user.name,
                        token: payload.token,
                        userData: payload.user
                    }
                } else {
                    throw new Error('Erorr...')

                }


            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.user = user
                token.accessToken = user.accessToken
            }
            return token
        },
        session: ({ session, token }) => {
            session.user = token.user as any
            return session
        }
    }


}