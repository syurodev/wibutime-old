import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"

import { db } from "@/drizzle/db"
import { user } from "@/drizzle/schema"

import { loginSchema } from "@/schemas/auth"
// import { getUserByUsername } from "./drizzle/queries/user/getUserByUsername"

export default {
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        image: profile.picture,
        email: profile.email,
      }
    }
  }),
  Credentials({
    async authorize(credentials) {
      const validatedField = loginSchema.safeParse(credentials)

      if (validatedField.success) {
        const { username, password } = validatedField.data

        const res = await fetch(`${process.env.BASE_URL}/api/auth/get-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
          }),
        });

        const existingUser = await res.json();

        if (!res.ok || !existingUser || !existingUser.hashedPassword) return null

        const isPasswordMatch = await bcrypt.compare(password, existingUser.hashedPassword)

        if (isPasswordMatch) return existingUser
      }

      return null
    }
  })],
} satisfies NextAuthConfig