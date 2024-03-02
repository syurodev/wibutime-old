"use client"

import React, { FC, useOptimistic, useState } from 'react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

import AddComment from './AddComment'
// import { Skeleton } from '@/components/ui/skeleton'
import SlideWithoutScale from '../Motion/SlideWithoutScale'
import { AnimatePresence } from 'framer-motion'
import CommentItem from './CommentItem'

type IProps = {
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  authorId: string
  contentId: string
  commentFor: CommentType
  comments: CommentData[]
}

const CommentSheet: FC<IProps> = ({
  isOpen,
  onOpenChange,
  authorId,
  contentId,
  commentFor,
  comments
}) => {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments ?? [],
    (state, newComment: CommentData) => {
      return [...state, newComment]
    }
  )

  const [reply, setReply] = useState<{
    replyId: string,
    replyContent: string,
    userName: string,
  } | null>(null)

  return (
    <Sheet
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <SheetContent className='flex justify-between flex-col w-full max-w-[450px]'>
        <SheetHeader>
          <SheetTitle>Bình luận</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full w-full rounded-md">
          <AnimatePresence mode='wait'>
            <div
              className='flex flex-col gap-3'
            >
              {
                !optimisticComments || optimisticComments.length === 0 ? (
                  <p className='text-sm font-semibold text-secondary-foreground text-center'>Không có bình luận</p>
                ) : (
                  optimisticComments.map((comment, index) => (
                    <SlideWithoutScale
                      key={`comment ${comment.id}`}
                      delay={index * 0.1}
                    >
                      <CommentItem
                        authorId={authorId}
                        comment={comment}
                        setReply={setReply}
                      />
                    </SlideWithoutScale>
                  ))
                )
              }
            </div>
          </AnimatePresence>
        </ScrollArea>
        <AddComment
          contentId={contentId}
          type={commentFor}
          addOptimisticComment={addOptimisticComment}
          reply={reply}
          setReply={setReply}
        />
      </SheetContent>
    </Sheet>

  )
}

export default CommentSheet