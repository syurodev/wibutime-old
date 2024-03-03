"use client"

import React, { FC, useEffect, useState, useTransition } from 'react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from '@/components/ui/skeleton'

import AddComment from './AddComment'
import SlideWithoutScale from '../Motion/SlideWithoutScale'
import { AnimatePresence } from 'framer-motion'
import CommentItem from './CommentItem'
import { getLightnovelComments } from '@/actions/lightnovel'

type IProps = {
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  authorId: string
  contentId: string
  commentFor: CommentType
}

const CommentSheet: FC<IProps> = ({
  isOpen,
  onOpenChange,
  authorId,
  contentId,
  commentFor,
}) => {
  const [comments, setComments] = useState<CommentData[]>([])
  const [isPending, startTransition] = useTransition()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchComment = () => {
    startTransition(async () => {
      const comments = await getLightnovelComments(contentId, "lightnovel chapter")

      setComments(comments.data ?? [])
    })
  }

  useEffect(() => {
    if (isOpen) {
      fetchComment()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

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
      <SheetContent className='flex justify-between flex-col !w-full !max-w-[500px]'>
        <SheetHeader>
          <SheetTitle>Bình luận</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full w-full rounded-md">
          <AnimatePresence mode='wait'>
            <div
              className='flex flex-col gap-3'
            >
              {
                isPending ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <SlideWithoutScale
                      key={`comment skeleton ${index}`}
                      delay={index * 0.1}
                    >
                      <div
                        className="flex items-center space-x-4"
                      >
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                    </SlideWithoutScale>
                  ))
                ) :
                  !comments || comments.length === 0 ? (
                    <p className='text-sm font-semibold text-secondary-foreground text-center'>Không có bình luận</p>
                  ) : (
                    comments.map((comment, index) => (
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
          addOptimisticComment={setComments}
          reply={reply}
          setReply={setReply}
          fetchComment={fetchComment}
        />
      </SheetContent>
    </Sheet>

  )
}

export default CommentSheet