'use client'

import { FC, useState, useTransition } from 'react'
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
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import styles from './styles.module.scss'
import CardWrapper from '../CardWrapper'
import { loginSchema } from '@/schemas/auth'
import { login } from '@/actions/login'
import { ReloadIcon } from '@radix-ui/react-icons'

const LoginForm: FC = () => {
  const [isPending, startTransiton] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setError("")
    setSuccess("")

    startTransiton(async () => {
      const res = await login(values)

      if (res.code !== 200) {
        setError(res.error)
      } else {
        setSuccess(res.success)
      }
    })
  }

  return (
    <CardWrapper
      bottomHref='/auth/register'
      bottomHrefLabel='Đăng ký'
      bottomLabel='Chưa có tài khoản?'
    >
      <div className='flex flex-col gap-9 w-full px-4'>
        <Button variant={"outline"} rounded={"full"} className='flex items-center gap-3' size={"lg"}>
          <FcGoogle className="text-lg" /> Đăng nhập với Google
        </Button>

        <hr className={`${styles.divider} text-xs text-secondary-foreground after:bg-background`} />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên đăng nhập</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      disabled={isPending}
                      {...field}
                    />
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
                    <Input
                      {...field}
                      type='password'
                      placeholder='******'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {
              error && (<p className='text-center text-destructive'>{error}</p>)
            }

            <Button
              type="submit"
              size={"lg"}
              rounded={"full"}
              disabled={isPending}
            >
              {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Đăng nhập
            </Button>
          </form>
        </Form>
      </div>
    </CardWrapper>
  )
}

export default LoginForm