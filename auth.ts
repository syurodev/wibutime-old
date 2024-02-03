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
      await updateEmailVerified(user.id)
    }
  },
  callbacks: {
    async signIn({ user, account }) {

      const existingUser = await getUserById(user.id)

      if (existingUser?.roles.length === 0) {
        await setUserRole(existingUser.id, "USER")
      }

      //Alow OAuth without email verification
      if (account?.provider !== "credentials") return true


      if (!existingUser?.emailVerified) {
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

      const userData = await getUserById(token.sub)

      if (!userData) return token

      token.role = userData.roles;
      if (userData?.username) {
        token.username = userData.username;
      }

      token.permissions = userData.permissions

      return token
    }
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})