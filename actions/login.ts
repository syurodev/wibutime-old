'use server';

import * as z from "zod"

import { loginSchema } from "@/schemas/auth";

export const login = async (values: z.infer<typeof loginSchema>) => {
  try {
    const validateFields = loginSchema.safeParse(values)

    if (!validateFields.success) {
      return {
        code: 400,
        error: "Vui lòng nhập các trường theo yêu cầu"
      }
    }

    return {
      code: 200,
      success: "Đăng nhập"
    }
  } catch (error) {
    console.log(error)
    throw new Error("Server Error")
  }
}