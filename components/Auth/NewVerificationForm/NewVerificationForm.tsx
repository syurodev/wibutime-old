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
import CardWrapper from '../CardWrapper';

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
    <CardWrapper
      bottomHref='/auth/login'
      bottomHrefLabel='đăng nhập'
      bottomLabel='Quay lại'
      label='Xác thực email'
      subLabel='Vui lòng đợi hệ thống xác thực'
    >

      <Button
        disabled={isLoading}
        variant={isLoading ? "default" : isSucess ? "success" : "destructive"}
        onClick={() => router.push("/auth/login")}
        className='w-full'
      >
        {
          isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        }
        {
          isLoading ? "Đang xác thực" : "Trở lại đăng nhập"
        }
      </Button>

    </CardWrapper>
  )
}

export default NewVerificationForm