import React, { Dispatch, FC, SetStateAction, useTransition } from 'react'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { LuCoins } from 'react-icons/lu'
import { Button } from '@/components/ui/button'
import { purchaseChapter } from '@/actions/lightnovel'
import { toast } from 'sonner'
import { ReloadIcon } from '@radix-ui/react-icons'

type IProps = {
  isOpen: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
  data: {
    novelId: string,
    chapterId: string,
    authorId: string,
    name: string,
    type: ContentType
  },
  type: ContentType
}

const PurchaseDialog: FC<IProps> = ({
  isOpen,
  setOpen,
  data,
  type
}) => {
  const [isPending, startTransiton] = useTransition()

  const handlePurchase = () => {
    startTransiton(async () => {
      switch (type) {
        case "lightnovel":
          const res = await purchaseChapter(
            data.chapterId,
            data.novelId,
            data.authorId
          )
          if (res.code === 200) {
            toast.success(res.message)
            setOpen(false)
          } else {
            toast.error(res.message)
          }
          break;

        default:
          toast.error("Lỗi đầu vào")
          break;
      }
    })
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận thanh toán</DialogTitle>
          <DialogDescription>{data.type === 'lightnovel' ? data.name : data.type === 'anime' ? `EP ${data.name}` : `CHAP ${data.name}`}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-1 justify-center">
          <p className='text-sm font-semibold'>200</p>
          <LuCoins />
        </div>

        <DialogFooter className='flex flex-row justify-center items-center gap-3'>
          <Button
            variant={"outline"}
            onClick={() => setOpen(false)}
          >
            Huỷ
          </Button>

          <Button
            onClick={handlePurchase}
            disabled={isPending}
            variant={"success"}
          >
            {
              isPending && (<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />)
            }
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PurchaseDialog