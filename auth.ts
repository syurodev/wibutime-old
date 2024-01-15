import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import type { DefaultSession } from 'next-auth';
import { getUserById } from "./data/user";
import { sendVerificationEmail } from "./lib/mail";
import { generateVerificationToken } from "./lib/tokens";

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      role: UserRole;
      permissions: UserPermissions[];
      name: string;
      username?: string;
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: true
        }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      //Alow OAuth without email verification
      if (account?.provider !== "credentials") return true

      const existingUser = await getUserById(user.id)

      if (!existingUser?.emailVerified) {
        const verificationToken = await generateVerificationToken(user.email!)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
      }

      return true
    },

    async session({ session, user, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as "USER" | "ADMIN" | "CREATER"
      }

      if (token.permissions && session.user) {
        session.user.permissions = token.permissions as UserPermissions[]
      }

      if (token.username && session.user) {
        session.user.username = token.username as string
      }

      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token

      const userData = await db.user.findUnique({
        where: { id: token.sub },
        include: {
          role: {
            select: {
              name: true,
              permissions: {
                select: {
                  name: true,
                }
              },
            },
          },
        },
      })

      if (!userData) return token

      token.role = userData.role.name;
      if (userData?.username) {
        token.username = userData.username;
      }
      token.permissions = userData.role.permissions.map(permission => permission.name)

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})