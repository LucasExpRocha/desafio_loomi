import type { NextAuthConfig } from "next-auth"
const publicRoutes = ["/"]

export const authConfig = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
       const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

      if (isPublicRoute) {
        if (isLoggedIn) return true
        return false
      } else if (isLoggedIn && nextUrl.pathname === "/") {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
        token.access_token = user.access_token
      }
      return token
    },
    async session({ session, token }) {
      // @ts-expect-error - user type extension
      session.user = token.user as unknown
      session.access_token = token.access_token as string
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
