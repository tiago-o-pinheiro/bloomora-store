import NextAuth, { type NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const edgeAuthConfig: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },

  callbacks: {
    async authorized({ request, auth }) {
      const protectedPaths = [
        /^\/shipping-address$/,
        /^\/payment-methods$/,
        /^\/place-order$/,
        /^\/profile$/,
        /^\/user\//,
        /^\/order\//,
        /^\/admin/,
      ];

      const { pathname } = request.nextUrl;

      // Block protected routes if no session
      if (!auth && protectedPaths.some((p) => p.test(pathname))) {
        return false;
      }

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
