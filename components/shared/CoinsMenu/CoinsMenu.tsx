"use client"

import React, { Dispatch, FC, SetStateAction, useState, useEffect, useTransition } from 'react'
import { LuCoins, LuInfo } from "react-icons/lu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'
import CoinsRecharge from './CoinsRecharge';
import CoinsRechargeResult from './CoinsRechargeResult';
import { Payments } from '@/drizzle/schema';
import { getPaymentsHistory } from '@/actions/payments';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatDate } from '@/lib/formatDate';
import { paymentServicesName } from '@/lib/paymentServicesName';
import { ReloadIcon } from '@radix-ui/react-icons';

type IProps = {
  coins: number,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const CoinsMenu: FC<IProps> = ({
  coins,
  open,
  setOpen,
}) => {
  const [openCoinsRecharge, setOpenCoinsRecharge] = useState<boolean>(false)
  const [paymentsHistory, setPaymentsHistory] = useState<Payments[]>([])

  const [isFetchPaymentHistoryPending, startFetchPaymentHistory] = useTransition()

  useEffect(() => {
    const fetchPaymentsHistory = () => {
      startFetchPaymentHistory(async () => {
        const res = await getPaymentsHistory()
        setPaymentsHistory(res)
      })
    }
    if (open) {
      fetchPaymentsHistory()
    }
  }, [open])

  return (
    <>
      <Sheet
        open={open}
        onOpenChange={setOpen}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle className='flex gap-1 items-center'>
              <LuCoins />
              {coins}
              Coins
            </SheetTitle>
            <SheetDescription className='text-left'>
              được sử dụng để thanh toán các chapter lightnovel, manga hoặc các tập phim
            </SheetDescription>
          </SheetHeader>

          <div className='flex items-center gap-3 justify-end pt-4'>
            <Button
              variant={"secondary"}
              rounded={"full"}
              onClick={() => setOpenCoinsRecharge(true)}
            >
              Nạp Coins
            </Button>
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue='paid'
          >
            <AccordionItem value="recharge">
              <AccordionTrigger>
                <div className='w-full flex items-center justify-between'>
                  <p className='text-sm'>Lịch sử nạp</p>
                  {
                    isFetchPaymentHistoryPending && (
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    )
                  }
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {
                  isFetchPaymentHistoryPending ? (
                    <ReloadIcon className="h-4 w-4 animate-spin" />
                  ) :
                    paymentsHistory.length === 0 ? (
                      <p
                        className='text-sm text-secondary-foreground select-none text-center'
                      >
                        Không có lịch sử thanh toán
                      </p>
                    ) : (
                      paymentsHistory.map((item, index) => (
                        <Card
                          key={item.id}
                        >
                          <CardHeader className='p-3'>
                            <div className='w-full flex justify-between items-center'>
                              <div className='flex gap-1 items-baseline'>
                                <p className='font-semibold text-sm'>{item.amount}</p>
                                <p
                                  className='text-xs'
                                >
                                  {formatDate(item.payDate ? item.payDate.toISOString() : "")}
                                </p>
                              </div>

                              <Button
                                size={"icon"}
                                variant={"ghost"}
                                rounded={"full"}
                              >
                                <LuInfo className="text-lg" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className='px-3 pb-3'>
                            <p
                              className='text-sm'
                            >
                              Mã giao dịch: {item.code}
                            </p>
                            <p
                              className='text-sm'
                            >
                              Dịch vụ: {paymentServicesName(item.service)}
                            </p>
                            <p className='text-sm'
                            >
                              Mã giao dịch ({paymentServicesName(item.service)}): {item.bankTransactionCode}
                            </p>
                          </CardContent>
                        </Card>
                      ))
                    )
                }
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="paid">
              <AccordionTrigger>Lịch sử sử dụng</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SheetContent>
      </Sheet>

      <CoinsRecharge
        open={openCoinsRecharge}
        setOpen={setOpenCoinsRecharge}
      />

      <CoinsRechargeResult />
    </>
  )
}

export default CoinsMenu