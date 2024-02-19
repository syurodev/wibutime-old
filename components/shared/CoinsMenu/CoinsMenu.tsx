"use client"

import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { LuCoins } from "react-icons/lu";

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
            <SheetDescription>
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
              <AccordionTrigger>Lịch sử nạp</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
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