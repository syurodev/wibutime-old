'use server';

import * as z from "zod"
import bcrypt from "bcryptjs"

import { registerSchema } from "@/schemas/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { getUserByUsername } from "@/drizzle/queries/user/getUserByUsername";
import { generateVerificationToken } from "@/drizzle/queries/token/generateVerificationToken";
import { createUser } from "@/drizzle/queries/user/createUser";
import { setUserRole } from "@/drizzle/queries/user/setUserRole";

export const register = async (values: z.infer<typeof registerSchema>) => {
  try {
    const validateFields = registerSchema.safeParse(values)

    if (!validateFields.success) {
      return {
        code: 400,
        message: "Vui lòng nhập các trường theo yêu cầu"
      }
    }

    const { username, name, password, email } = validateFields.data

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByUsername(username)

    if (existingUser) {
      return {
        code: 400,
        message: "Tên đăng nhập đã được sử dụng"
      }
    }

    const createdUser = await createUser({
      name: name,
      username: username,
      email: email,
      hashedPassword: hashedPassword,
    })

    if (!createdUser) return {
      code: 400,
      message: "Có lỗi trong quá trình đăng ký, vui lòng thử lại",
    }

    await setUserRole(createdUser.id, "USER")

    const verificationToken = await generateVerificationToken(createdUser.email)

    if (!verificationToken) {
      return {
        code: 200,
        message: "Đăng ký thành công",
        submess: "Vui lòng đăng nhập để nhận mã xác thực"
      }
    }

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return {
      code: 200,
      message: "Đăng ký thành công",
      submess: "Liên kết xác thực đã được gửi đến email của bạn, liên kết sẻ hết hạn sau 1 giờ"
    }
  } catch (error) {
    console.log(error)
    return {
      code: 500,
      message: "Lỗi server"
    }
  }
}