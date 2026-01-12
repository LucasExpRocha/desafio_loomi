import { AxiosError } from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { api } from "./lib/api";
import { decodeJwt } from "./lib/decodeJwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { data } = await api.post("/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });

          if (data) {
            const { payload } = decodeJwt(data.access_token);
            return {
              id: payload.id,
              email: credentials.email as string,
              access_token: data.access_token,
            };
          }

          return null;
        } catch (error) {
          if (error instanceof AxiosError) {
            console.error("Auth error:", error.response?.data || error.message);
          } else {
            console.error("Auth error:", error);
          }
          return null;
        }
      },
    }),
  ],
});
