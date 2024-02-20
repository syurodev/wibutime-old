"use client"

import React, { Dispatch, FC, SetStateAction, useState, useTransition } from 'react'
import { usePathname } from 'next/navigation'
import { ReloadIcon } from '@radix-ui/react-icons'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { createVNPayUrl } from '@/actions/payments'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LuBanknote, LuCreditCard, LuQrCode } from 'react-icons/lu'

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
  const [paymentMethods, setPaymentMethods] = useState<"VNPAYQR" | "VNBANK" | "INTCARD">("VNBANK")
  const pathname = usePathname()
  const [isPending, startTransiton] = useTransition()

  const handleCreateVNPayUrl = () => {
    startTransiton(async () => {
      const res = await createVNPayUrl(amount, pathname, paymentMethods)

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
      <DialogContent className="md:max-w-xl">
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

          <RadioGroup
            defaultValue="VNBANK"
            className='flex gap-3 items-center'
            value={paymentMethods}
            onValueChange={(value) => setPaymentMethods(value as "VNPAYQR" | "VNBANK" | "INTCARD")}
          >
            <div
              className={`flex flex-col items-center space-x-2 rounded-lg border-[1.5px] cursor-pointer select-none transition-all duration-150 w-full ${paymentMethods === "VNPAYQR" ? "border-primary" : "border-transparent"} pointer-events-none bg-secondary`}
            >
              <RadioGroupItem value="VNPAYQR" id="VNPAYQR" className='hidden' />
              <Label
                htmlFor="VNPAYQR"
                className='w-full h-28 px-2 rounded-md flex flex-col justify-center items-center cursor-pointer !m-0 py-1'
              >
                <LuQrCode className="text-3xl h-full" />
                <p className='text-sm text-center h-full'
                >
                  Thanh toán quét mã QR
                </p>
              </Label>
            </div>

            <div
              className={`flex flex-col items-center space-x-2 rounded-lg border-[1.5px] cursor-pointer select-none transition-all duration-150 w-full ${paymentMethods === "VNBANK" ? "border-primary" : "border-transparent"}`}
            >
              <RadioGroupItem value="VNBANK" id="VNBANK" className='hidden' />
              <Label
                htmlFor="VNBANK"
                className='w-full h-28 px-2 rounded-md flex flex-col justify-center items-center cursor-pointer !m-0 py-1'
              >
                <LuBanknote className="text-3xl h-full" />
                <p className='text-sm text-center h-full'
                >
                  Thẻ ATM - Tài khoản ngân hàng nội địa
                </p>
              </Label>
            </div>

            <div
              className={`flex flex-col items-center space-x-2 rounded-lg border-[1.5px] cursor-pointer select-none transition-all duration-150 w-full ${paymentMethods === "INTCARD" ? "border-primary" : "border-transparent"}`}
            >
              <RadioGroupItem value="INTCARD" id="INTCARD" className='hidden' />
              <Label
                htmlFor="INTCARD"
                className='w-full h-28 px-2 rounded-md flex flex-col justify-center items-center cursor-pointer !m-0 py-1'
              >
                <LuCreditCard className="text-3xl h-full" />
                <p className='text-sm text-center h-full'
                >
                  Thẻ thanh toán quốc tế
                </p>
              </Label>
            </div>
          </RadioGroup>

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