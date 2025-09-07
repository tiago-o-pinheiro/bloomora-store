import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/db/prisma";
import { compareSync } from "bcrypt-ts-edge";
import { CredentialsSchema } from "@/lib/validators/credentials.valitador";
import type { NextAuthConfig } from "next-auth";
import { edgeAuthConfig } from "./auth-edge";
import { getSessionCartId } from "./lib/actions/cart/cart.actions";

const MAX_TOKEN_LIFE = process.env.MAX_TOKEN_LIFE;

export const config: NextAuthConfig = {
  ...edgeAuthConfig,
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error",
  },
  session: {
    strategy: "jwt",
    maxAge: Number(MAX_TOKEN_LIFE) || 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email", placeholder: "Email" },
        password: { type: "password", placeholder: "Password" },
      },
      async authorize(credentials) {
        const parsed = CredentialsSchema.safeParse(credentials);
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
        session.user.id = token.id as string;
        session.user.role = token.role;
        session.user.name = token.name ?? session.user.name;
      }

      if (trigger === "update" && session.user) {
        session.user.name = token.name ?? session.user.name;
      }

      return session;
    },

    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        if (user.name === "NO_NAME") {
          token.name = user.email?.split("@")[0] || "User";

          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }

        if (trigger === "signIn" || trigger === "signUp") {
          const sessionCartId = await getSessionCartId();

          if (sessionCartId) {
            const sessionCart = await prisma.cart.findFirst({
              where: { sessionCartId: sessionCartId },
            });

            if (sessionCart) {
              await prisma.cart.deleteMany({
                where: { userId: user.id },
              });

              await prisma.cart.update({
                where: { id: sessionCart.id },
                data: { userId: user.id },
              });
            }
          }
        }
      }

      return token;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
