import * as z from "zod"

export const loginSchema = z.object({
  username: z.string().trim().min(1, { message: "Tên người dùng là bắt buộc" }),
  password: z.string().min(1, { message: "Mật khẩu là bắt buộc" }),
})

export const registerSchema = z.object({
  username: z.string().trim().min(6, { message: "Tên người dùng phải có ít nhất 6 ký tự" }),
  name: z.string().trim().min(3, { message: "Tên phải có ít nhất 3 ký tự" }),
  email: z.string().trim().email({ message: "Vui lòng nhập email hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  confirmPassword: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Nhập lại mật khẩu không đúng",
  path: ["confirmPassword"]
})

export const resetSchema = z.object({
  email: z.string().trim().email({ message: "Vui lòng nhập email hợp lệ" }),
})

export const newPasswordSchema = z.object({
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  confirmPassword: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Nhập lại mật khẩu không đúng",
  path: ["confirmPassword"]
})