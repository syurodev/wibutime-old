'use client'

import { FC, useEffect, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ReloadIcon } from '@radix-ui/react-icons'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'

import { newPasswordSchema } from '@/schemas/auth'
import { changePassword } from '@/actions/changePassword'
import CardWrapper from '../CardWrapper'

const NewPasswordForm: FC = () => {
  const [isPending, startTransiton] = useTransition()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email đã đăng nhập bằng tài khoản liên kết khác" : ""
  const router = useRouter()

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  useEffect(() => {
    if (urlError !== "") {
      toast.error(urlError)
    }
  }, [urlError])

  function onSubmit(values: z.infer<typeof newPasswordSchema>) {
    if (!token) {
      toast.error("Token không tồn tại")
      return
    }

    startTransiton(async () => {
      const res = await changePassword(token, values)

      if (res.code !== 200) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
        router.push("/auth/login")
      }
    })
  }

  return (
    <CardWrapper
      bottomHref='/auth/login'
      bottomHrefLabel='đăng nhập'
      bottomLabel='Quay lại'
      label='Mật khẩu mới'
      subLabel='Nhập 2 lần mật khẩu mới'
    >
      <div className='flex flex-col gap-9 w-full'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      disabled={isPending}
                      {...field}
                      type='password'
                    />
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
                    <Input
                      placeholder="******"
                      disabled={isPending}
                      {...field}
                      type='password'
                    />
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
              Đổi mật khẩu
            </Button>
          </form>
        </Form>
      </div>
    </CardWrapper>
  )
}

export default NewPasswordForm