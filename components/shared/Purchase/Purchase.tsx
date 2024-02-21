"use client"

import React, { FC, useTransition } from 'react'
import { toast } from 'sonner'

import { purchaseChapter } from '@/actions/lightnovel'
import { LuCoins } from 'react-icons/lu'
import { Button, buttonVariants } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import Link from 'next/link'

type IProps = {
  data: LightnovelChapterDetail
}

const Purchase: FC<IProps> = ({ data }) => {
  const [isPending, startTransiton] = useTransition()
  const router = useRouter()
  const session = useCurrentUser()

  const handlePurchase = () => {
    startTransiton(async () => {
      const res = await purchaseChapter(
        data.id,
        data.novelId,
        data.authorId
      )

      if (res.code !== 200) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
      }
    })
  }

  return (
    <div className='max-w-[500px] mx-auto space-y-3'>
      <div>
        <p className='font-semibold text-center'>Xác nhận thanh toán</p>
        <p className='text-sm text-secondary-foreground text-center'>{data.name}</p>
      </div>

      <div className="flex items-center gap-1 justify-center">
        <p className='text-sm font-semibold'>200</p>
        <LuCoins />
      </div>

      <div className='flex items-center gap-3 justify-center'>
        <Button
          variant={"outline"}
          onClick={() => router.back()}
        >
          Huỷ
        </Button>

        {
          session ? (
            <Button
              variant={"success"}
              onClick={handlePurchase}
              disabled={isPending}
            >
              {
                isPending && (<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />)
              }
              Xác nhận
            </Button>
          ) : (
            <Link
              className={buttonVariants({ variant: "default" })}
              href="/auth/login"
            >
              Đăng nhập
            </Link>
          )
        }

      </div>
    </div>
  )
}

export default Purchase