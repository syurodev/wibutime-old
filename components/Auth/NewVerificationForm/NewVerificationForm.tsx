'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import Lottie from 'lottie-react'
import { toast } from "sonner"

import logoAnimation from '@/lib/logoAnimation.json'
import { useRouter, useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/verificationEmail';
import { ReloadIcon } from '@radix-ui/react-icons';

const NewVerificationForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSucess, setIsSucess] = useState<boolean>(false)

  const token = searchParams.get("token")

  const onSubmit = useCallback(async () => {
    if (!token) {
      toast.error("Token không tồn tại")
      return
    }
    setIsLoading(true)
    const res = await newVerification(token)
    setIsLoading(false)
    if (res.code === 200) {
      setIsSucess(true)
      toast.success(res.message, {
        action: {
          label: "Đăng nhập",
          onClick: () => router.push("/auth/login")
        },
      })
    } else if (res.code === 400) {
      toast.error(res.message)
    }
  }, [router, token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div className='flex justify-center items-center h-dvh w-full'>
      <Card className='flex flex-col items-center'>
        <CardHeader className='text-center text-lg relative space-y-4 z-0'>
          <div className='relative w-full flex justify-center'>
            <Link
              href={"/"}
              className='relative flex items-center justify-start pl-10'
              scroll
            >
              <Lottie animationData={logoAnimation} loop={false} className='absolute size-60 -left-[110px] -top-[111px]' />
              <span className='font-semibold'>Wibutime</span>
            </Link>
          </div>
        </CardHeader>

        <CardContent className='z-10 py-3'>
          <Button
            disabled={isLoading}
            variant={isLoading ? "default" : isSucess ? "success" : "destructive"}
            onClick={() => router.push("/auth/login")}
          >
            {
              isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            }
            {
              isLoading ? "Đang xác thực" : "Trở lại đăng nhập"
            }
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default NewVerificationForm