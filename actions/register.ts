'use server';

import * as z from "zod"
import bcrypt from "bcryptjs"

import { registerSchema } from "@/schemas/auth";
import { db } from "@/lib/db";
import { getUserByUsername } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

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
      await db.$disconnect()
      return {
        code: 400,
        message: "Tên đăng nhập đã được sử dụng"
      }
    }

    await db.user.create({
      data: {
        name: name,
        username: username,
        email: email,
        hashed_password: hashedPassword,
        role_id: process.env.USER_ROLE_ID as UserRole
      }
    })

    const verificationToken = await generateVerificationToken(email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)
    await db.$disconnect()
    return {
      code: 200,
      message: "Đăng ký thành công",
      submess: "Liên kết xác thực đã được gửi đến email của bạn, liên kết sẻ hết hạn sau 1 giờ"
    }
  } catch (error) {
    await db.$disconnect()
    console.log(error)
    return {
      code: 500,
      message: "Lỗi server"
    }
  }
}