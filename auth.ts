import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

import authConfig from "@/auth.config"
import type { DefaultSession } from 'next-auth';
import { sendVerificationEmail } from "./lib/mail";
import { db } from "./drizzle/db";
import { updateEmailVerified } from "./drizzle/queries/user/updateEmailVerified";
import { getUserById } from "./drizzle/queries/user/getUserById";
import { generateVerificationToken } from "./drizzle/queries/token/generateVerificationToken";
import { setUserRole } from "./drizzle/queries/user/setUserRole";

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      role: UserRole;
      permissions: UserPermissions[];
      name: string;
      coins: number;
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
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    async linkAccount({ user }) {
      if (user) {
        await updateEmailVerified(user.id!)
        await setUserRole(user.id!, "USER")
      }
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      //Alow OAuth without email verification
      if (account?.provider !== "credentials") return true

      if (!user) return false
      const existingUser = await getUserById(user.id!)

      if (existingUser && !existingUser?.emailVerified) {
        const verificationToken = await generateVerificationToken(user.email!)

        if (!verificationToken) return false

        await sendVerificationEmail(verificationToken.email, verificationToken.token)
      }
      return true
    },

    async session({ session, user, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      if (token.permissions && session.user) {
        session.user.permissions = token.permissions as UserPermissions[]
      }

      if (token.username && session.user) {
        session.user.username = token.username as string
      }

      if (token.coins && session.user) {
        session.user.coins = token.coins as number
      }

      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token

      const userData = await getUserById(token.sub)

      if (!userData) return token

      token.role = userData.roles;
      if (userData?.username) {
        token.username = userData.username;
      }

      token.permissions = userData.permissions
      token.coins = userData.coins

      return token
    }
  },
  session: { strategy: "jwt" },
  ...authConfig,
})