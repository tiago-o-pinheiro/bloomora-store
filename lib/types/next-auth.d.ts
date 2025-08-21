import type { User as PrimeUser } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: PrismaUser["role"] | null;
    };
  }

  interface User {
    id: string;
    role?: PrismaUser["role"] | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
    name?: string | null;
    email?: string | null;
    role?: PrismaUser["role"] | null;
  }
}
