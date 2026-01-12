import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    access_token: string
  }

  interface Session {
    user: User & {
      access_token: string
    }
    access_token: string
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    access_token: string
  }
}
