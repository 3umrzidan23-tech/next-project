// import { UserResponse } from './authInterface';
// import NextAuth, { DefaultSession, User } from "next-auth"
// import { JWT } from "next-auth/jwt"

// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface User {
//     user : UserResponse,
//     token : string

//   }

//   interface Session {
//     user : UserResponse

//   }
// }

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT extends User {
//     /** OpenID ID Token */

//   }
// }

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
  }
}
