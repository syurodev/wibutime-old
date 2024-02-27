'use client'

import React, { FC, useState, useTransition } from 'react'
import { v4 as uuid } from "uuid";
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'

import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { createComment } from '@/actions/lightnovel'
import { useCurrentUser } from '@/hooks/useCurrentUser'

type IProps = {
  className?: string
  contentId: string
  type: CommentType
  addOptimisticComment: (action: CommentData) => void
}

const AddComment: FC<IProps> = ({
  className,
  type,
  contentId,
  addOptimisticComment
}) => {
  const [commentContent, setCommentContent] = useState<string>("")
  const pathName = usePathname()
  const session = useCurrentUser()
  const [isPending, startTransition] = useTransition()

  const handldInsertComment = () => {
    const newComment: CommentData = {
      id: uuid(),
      comment: commentContent,
      createdAt: new Date(),
      uncomplete: true,
      user: {
        id: session?.id!,
        name: session?.name!,
        image: session?.image ?? undefined
      }
    }
    addOptimisticComment(newComment)
    startTransition(async () => {
      const res = await createComment(commentContent, contentId, pathName)

      if (res.code !== 200) {
        toast.error(res.message)
      } else {
        setCommentContent("")
      }
    })
  }

  return (
    <div className={cn("w-full flex flex-col gap-3", className)}>
      <Textarea
        className='w-full rounded-xl showScroll overflow-x-hidden'
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        disabled={isPending}
      />

      <div className='flex gap-3 justify-end'>
        <Button
          variant={"outline"}
          rounded={"full"}
        >
          Huỷ
        </Button>
        <Button
          variant={"default"}
          rounded={"full"}
          disabled={commentContent === "" || commentContent.trim() === "" || isPending || !session}
          onClick={handldInsertComment}
        >
          Bình luận
        </Button>
      </div>
    </div>
  )
}

export default AddComment