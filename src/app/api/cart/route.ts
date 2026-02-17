// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         const response = await fetch(`${process.env.API}/login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(credentials),
//         });

//         if (!response.ok) return null;

//         const data = await response.json();

//         return {
//           id: data.user.id,
//           name: data.user.name,
//           email: data.user.email,
//           accessToken: data.token,
//         };
//       },
//     }),
//   ],

//   session: { strategy: "jwt" },

//   callbacks: {
//     jwt: ({ token, user }) => {
//       if (user) {
//         token.id = user.id;
//         token.accessToken = user.accessToken;
//       }
//       return token;
//     },
//     session: ({ session, token }) => {
//       session.user.id = token.id as string;
//       session.accessToken = token.accessToken as string;
//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default NextAuth(authOptions);
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API; // تأكد أن هذا موجود في .env

// ----------------- GET -----------------
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}

// ----------------- POST -----------------
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const res = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}

// ----------------- DELETE -----------------
export async function DELETE(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const res = await fetch(`${API_URL}/cart`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
