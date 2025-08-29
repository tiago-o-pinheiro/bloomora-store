import NextAuth, { type NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const edgeAuthConfig: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: "/signin",
    error: "/error",
  },

  callbacks: {
    async authorized({ request }) {
      if (!request.cookies.get("sessionCartId")) {
        const sessionCartId = crypto.randomUUID();
        const res = NextResponse.next({
          request: { headers: request.headers },
        });
        res.cookies.set({
          name: "sessionCartId",
          value: sessionCartId,
          httpOnly: true,
        });
        return res;
      }
      return true;
    },
  },
};

export const { auth } = NextAuth(edgeAuthConfig);
