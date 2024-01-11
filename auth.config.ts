import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"

import { loginSchema } from "@/schemas/auth"
import { getUserByUsername } from "./data/user"

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
        roleId: process.env.USER_ROLE_ID
      }
    }
  }),
  Credentials({
    async authorize(credentials) {
      const validatedField = loginSchema.safeParse(credentials)

      if (validatedField.success) {
        const { username, password } = validatedField.data

        const user = await getUserByUsername(username)

        if (!user || !user.hashedPassword) return null

        const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword)

        if (isPasswordMatch) return user
      }

      return null
    }
  })],
} satisfies NextAuthConfig