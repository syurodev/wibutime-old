'use server';

import * as z from "zod"
import { AuthError } from "next-auth";

import { loginSchema } from "@/schemas/auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { isValidEmail } from "@/lib/isEmail";
import { sendVerificationEmail } from "@/lib/mail";
import { getUserByUsername } from "@/drizzle/queries/user/getUserByUsername";
import { generateVerificationToken } from "@/drizzle/queries/token/generateVerificationToken";

export const login = async (
  values: z.infer<typeof loginSchema>,
  callbackUrl?: string | null
) => {
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

    if (isEmail) return {
      code: 400,
      message: "Vui lòng đăng nhập bằng tên đăng nhập"
    }

    const existingUser = await getUserByUsername(username)

    if (!existingUser || !existingUser.email) {
      return {
        code: 400,
        message: "Người dùng không tồn tại"
      }
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(existingUser.email)

      if (!verificationToken) return {
        code: 400,
        message: "Không thể gửi email xác thực, vui lòng thử lại"
      }

      await sendVerificationEmail(verificationToken.email, verificationToken.token)

      return {
        code: 200,
        message: "Email xác thực đã được gửi"
      }
    }

    await signIn("credentials", {
      username,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
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