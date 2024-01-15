'use client'

import { FC, useTransition } from 'react'
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
import dynamic from 'next/dynamic'

import { resetSchema } from '@/schemas/auth'
import { resetPassword } from '@/actions/resetPassword'

const ComponentWithNoSSR = dynamic(() => import('@/components/Auth/CardWrapper'), {
  ssr: false
})
const ResetForm: FC = () => {
  const [isPending, startTransiton] = useTransition()

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof resetSchema>) {
    startTransiton(async () => {
      const res = await resetPassword(values)

      if (res.code !== 200) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
      }
    })
  }

  return (
    <ComponentWithNoSSR
      bottomHref='/auth/login'
      bottomHrefLabel='đăng nhập'
      bottomLabel='Quay lại'
    >
      <div className='flex flex-col gap-9 w-full px-4'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email<span className='text-destructive'>*</span></FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@example.com"
                      disabled={isPending}
                      {...field}
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
              Yêu cầu đặt lại mật khẩu
            </Button>
          </form>
        </Form>
      </div>
    </ComponentWithNoSSR>
  )
}

export default ResetForm