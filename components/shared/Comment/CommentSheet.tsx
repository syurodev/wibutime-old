import React, { FC } from 'react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

type IProps = {
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

const CommentSheet: FC<IProps> = ({
  isOpen,
  onOpenChange,
}) => {
  return (
    <Sheet
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>

        </SheetHeader>
      </SheetContent>
    </Sheet>

  )
}

export default CommentSheet