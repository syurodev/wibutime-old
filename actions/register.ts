'use server';

import * as z from "zod"

import { registerSchema } from "@/schemas/auth";

export const register = async (values: z.infer<typeof registerSchema>) => {
  try {
    const validateFields = registerSchema.safeParse(values)

    if (!validateFields.success) {
      return {
        code: 400,
        error: "Vui lòng nhập các trường theo yêu cầu"
      }
    }

    return {
      code: 200,
      success: "Đăng ký"
    }
  } catch (error) {
    console.log(error)
    throw new Error("Server Error")
  }
}