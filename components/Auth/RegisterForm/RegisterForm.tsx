'use client'

import { FC, useState, useTransition } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc";

import styles from './styles.module.scss'
import CardWrapper from '../CardWrapper'
import { registerSchema } from '@/schemas/auth'
import { register } from '@/actions/register'
import { ReloadIcon } from '@radix-ui/react-icons'

const RegisterForm: FC = () => {
  const [isPending, startTransiton] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      name: ""
    },
  })

  function onSubmit(values: z.infer<typeof registerSchema>) {
    startTransiton(async () => {
      const res = await register(values)

      if (res.code !== 200) {
        setError(res.error)
      } else {
        setSuccess(res.success)
      }
    })
  }

  return (
    <CardWrapper
      bottomHref='/auth/login'
      bottomHrefLabel='Đăng nhập'
      bottomLabel='Đã có tài khoản?'
    >
      <div className='flex flex-col gap-9 w-full px-4'>
        <Button variant={"outline"} rounded={"full"} className='flex items-center gap-3' size={"lg"}>
          <FcGoogle className="text-lg" /> Đăng ký với Google
        </Button>

        <hr className={`${styles.divider} text-xs text-secondary-foreground after:bg-background`} />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Jame" disabled={isPending} {...field} />
                  </FormControl>
                  <FormDescription>
                    Tên sẻ được hiển thị thay thế cho tên người dùng
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên đăng nhập</FormLabel>
                  <FormControl>
                    <Input placeholder="username" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='******' disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhập lại mật khẩu</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='******' disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size={"lg"}
              rounded={"full"}
              disabled={isPending}
            >
              {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Đăng ký
            </Button>
          </form>
        </Form>
      </div>
    </CardWrapper>
  )
}

export default RegisterForm