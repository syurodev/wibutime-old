'use server';

import * as z from "zod"
import { AuthError } from "next-auth";

import { loginSchema } from "@/schemas/auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail, getUserByUsername } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { isValidEmail } from "@/lib/isEmail";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof loginSchema>) => {
  try {
    const validateFields = loginSchema.safeParse(values)

    if (!validateFields.success) {
      return {
        code: 400,
        error: "Vui lòng nhập các trường theo yêu cầu"
      }
    }

    const { username, password } = validateFields.data

    const isEmail = isValidEmail(username)

    let existingUser = null

    if (isEmail) {
      existingUser = await getUserByEmail(username)
    } else {
      existingUser = await getUserByUsername(username)
    }

    if (!existingUser || !existingUser.email) {
      return {
        code: 400,
        message: "Email không tồn tại"
      }
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(existingUser.email)
      await sendVerificationEmail(verificationToken.email, verificationToken.token)

      return {
        code: 200,
        message: "Email xác thực đã được gửi"
      }
    }

    await signIn("credentials", {
      username,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
    return {
      code: 200,
      message: "Đăng nhập thành công"
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            code: 400,
            message: "Thông tin không hợp lệ"
          }
        default:
          return {
            code: 400,
            message: "Lỗi không xác định"
          }
      }
    }
    console.log(error)
    throw error
  }
}