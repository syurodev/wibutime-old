'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { LuBadgeAlert, LuBadgeCheck } from "react-icons/lu";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { verificationVNPayPayment } from '@/actions/payments'
import { toast } from 'sonner'
import { ReloadIcon } from '@radix-ui/react-icons'

const CoinsRechargeResult = () => {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<"success" | "loading" | "failed">("loading")

  const searchParams = useSearchParams()

  //Các thông tin trả về từ vnpay
  const vnp_Amount = searchParams.get("vnp_Amount")
  const vnp_BankCode = searchParams.get("vnp_BankCode")
  const vnp_BankTranNo = searchParams.get("vnp_BankTranNo")
  const vnp_CardType = searchParams.get("vnp_CardType")
  const vnp_OrderInfo = searchParams.get("vnp_OrderInfo")
  const vnp_PayDate = searchParams.get("vnp_PayDate")
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode")
  const vnp_TmnCode = searchParams.get("vnp_TmnCode")
  const vnp_TransactionNo = searchParams.get("vnp_TransactionNo")
  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus")
  const vnp_TxnRef = searchParams.get("vnp_TxnRef")
  const vnp_SecureHash = searchParams.get("vnp_SecureHash")
  const vnp_SecureHashType = searchParams.get("vnp_SecureHashType")

  useEffect(() => {
    const checking = async () => {
      if (!vnp_SecureHash) {
        return
      }
      setOpen(true)
      const res = await verificationVNPayPayment({
        vnp_Amount: vnp_Amount ? +vnp_Amount : undefined,
        vnp_BankCode: vnp_BankCode ?? undefined,
        vnp_BankTranNo: vnp_BankTranNo ?? undefined,
        vnp_CardType: vnp_CardType ?? undefined,
        vnp_OrderInfo: vnp_OrderInfo ?? undefined,
        vnp_PayDate: vnp_PayDate ?? undefined,
        vnp_ResponseCode: vnp_ResponseCode ?? undefined,
        vnp_TmnCode: vnp_TmnCode ?? undefined,
        vnp_TransactionNo: vnp_TransactionNo ?? undefined,
        vnp_TransactionStatus: vnp_TransactionStatus ?? undefined,
        vnp_TxnRef: vnp_TxnRef ?? undefined,
        vnp_SecureHash: vnp_SecureHash ?? undefined,
        vnp_SecureHashType: vnp_SecureHashType ?? undefined,
      })

      if (res.code === 200) {
        setResult('success')
        toast.success(res.message, {
          description: `Số coins hiện tại của bạn là ${res.data}`
        })
      } else {
        setResult('failed')
        toast.error(res.message)
      }
    }

    checking()
  }, [vnp_Amount, vnp_BankCode, vnp_BankTranNo, vnp_CardType, vnp_OrderInfo, vnp_PayDate, vnp_ResponseCode, vnp_SecureHash, vnp_SecureHashType, vnp_TmnCode, vnp_TransactionNo, vnp_TransactionStatus, vnp_TxnRef])

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận thanh toán</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-3 flex-col">
          {
            result === 'loading' ? (
              <div className='flex flex-col items-center gap-1'>
                <ReloadIcon className="h-6 w-h-6 animate-spin" />
                <p className='text-sm'>Đang xác thực thanh toán</p>
              </div>
            ) : result === 'success' ? (
              <div className='flex flex-col items-center gap-1'>
                <LuBadgeCheck className="text-3xl text-success" />
                <p className='text-sm'>Thanh toán thành công</p>
              </div>
            ) : (
              <div className='flex flex-col items-center gap-1'>
                <LuBadgeAlert className="text-3xl text-destructive" />
                <p className='text-sm'>Thanh toán thất bại</p>
              </div>
            )
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CoinsRechargeResult