"use client"

import React, { Dispatch, FC, SetStateAction, useState, useTransition } from 'react'
import { usePathname } from 'next/navigation'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createVNPayUrl } from '@/actions/payments'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ReloadIcon } from '@radix-ui/react-icons'

type IProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const CoinsRecharge: FC<IProps> = ({
  open,
  setOpen,
}) => {
  const router = useRouter()
  const [amount, setAmount] = useState<number>(10000)
  const pathname = usePathname()
  const [isPending, startTransiton] = useTransition()

  const handleCreateVNPayUrl = () => {
    startTransiton(async () => {
      const res = await createVNPayUrl(amount, pathname)

      if (res) {
        router.push(res)
      } else {
        toast.error("Có lỗi trong quá trình chuẩn bị, vui lòng thử lại")
      }

    })

  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nạp Coins</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-3 flex-col">
          <div className="flex items-center gap-3 w-full">
            <Label htmlFor="coins" className="text-right whitespace-nowrap">
              Số tiền
            </Label>
            <Input
              id="coins"
              type='number'
              className="w-full"
              disabled={isPending}
              required
              min={10000}
              value={amount.toString()}
              onChange={(e) => setAmount(+e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleCreateVNPayUrl}
          >
            {
              isPending && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )
            }
            Nạp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CoinsRecharge