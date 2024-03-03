'use client'

import React, { FC, useState, useTransition } from 'react'
import { v4 as uuid } from "uuid";
import { toast } from 'sonner'

import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { createComment } from '@/actions/lightnovel'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import SlideWithoutScale from '../Motion/SlideWithoutScale';
import { LuX } from 'react-icons/lu';
import { AnimatePresence } from 'framer-motion';
import { ReloadIcon } from '@radix-ui/react-icons';

type IProps = {
  className?: string
  contentId: string
  type: CommentType
  setReply: React.Dispatch<React.SetStateAction<{
    replyId: string;
    replyContent: string;
    userName: string;
  } | null>>
  reply: {
    replyId: string;
    replyContent: string;
    userName: string;
  } | null
  addOptimisticComment: React.Dispatch<React.SetStateAction<CommentData[]>>,
  fetchComment: () => void
}

const AddComment: FC<IProps> = ({
  className,
  type,
  contentId,
  addOptimisticComment,
  reply,
  setReply,
  fetchComment
}) => {
  const [commentContent, setCommentContent] = useState<string>("")
  const session = useCurrentUser()
  const [isPending, startTransition] = useTransition()

  const handldInsertComment = () => {
    if (!reply) {
      const newComment: CommentData = {
        id: uuid(),
        comment: commentContent,
        createdAt: new Date(),
        uncomplete: true,
        favoriteNumber: "0",
        isFavorite: false,
        user: {
          id: session?.id!,
          name: session?.name!,
          image: session?.image ?? undefined
        }
      }
      addOptimisticComment((prev) => [...prev, newComment])
    }

    startTransition(async () => {
      const res = await createComment(commentContent, contentId, reply?.replyId ?? undefined)

      if (res.code !== 200) {
        toast.error(res.message)
      } else {
        setCommentContent("")
        setReply(null)
        fetchComment()
      }
    })
  }

  return (
    <div className={cn("w-full flex flex-col gap-3", className)}>
      <AnimatePresence mode='wait'>
        {
          reply && (
            <SlideWithoutScale
              className='border p-2 rounded-xl relative'
              key={`comment reply ${reply.replyId}`}
            >
              <div className='flex items-center justify-between mb-1'>
                <p
                  className='text-sm line-clamp-1'
                >
                  <strong>Trả lời:</strong> {reply.userName}
                </p>
                <Button
                  variant={"secondary"}
                  size={"icon"}
                  rounded={"full"}
                  className='size-6'
                  onClick={() => setReply(null)}
                >
                  <LuX />
                </Button>
              </div>

              <p className='text-xs line-clamp-1'>{reply.replyContent}</p>
            </SlideWithoutScale>
          )
        }
      </AnimatePresence>
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
          {
            isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin mx-auto" />
          }
          Bình luận
        </Button>
      </div>
    </div>
  )
}

export default AddComment