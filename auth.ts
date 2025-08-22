import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/db/prisma";
import { compareSync } from "bcrypt-ts-edge";
import { CredentialsValidator } from "@/lib/validators/credentials.valitador";

import type { NextAuthConfig } from "next-auth";

const MAX_TOKEN_LIFE = process.env.MAX_TOKEN_LIFE;

export const config: NextAuthConfig = {
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error",
  },
  session: {
    strategy: "jwt",
    maxAge: MAX_TOKEN_LIFE ? parseInt(MAX_TOKEN_LIFE) : 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email", placeholder: "Email" },
        password: { type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
        const parsed = CredentialsValidator.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        if (user && user.password) {
          const isMatch = compareSync(password, user.password);
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }

          return null;
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
  callbacks: {
    async session({ session, trigger, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
      }
      if (trigger === "update") {
        if (session.user) {
          session.user.name = token.name;
        }
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
