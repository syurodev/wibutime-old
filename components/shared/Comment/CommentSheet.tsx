"use client"

import React, { FC, memo, useEffect, useState, useTransition } from 'react'
import { useInView } from 'react-intersection-observer'

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
import { ReloadIcon } from '@radix-ui/react-icons'

type IProps = {
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  authorId: string
  contentId: string
  commentFor: CommentType
  totalComment: number
}

const CommentSheet: FC<IProps> = ({
  isOpen,
  onOpenChange,
  authorId,
  contentId,
  commentFor,
  totalComment
}) => {
  const [comments, setComments] = useState<CommentData[]>([])
  const [step, setStep] = useState<number>(0)
  const [isPending, startTransition] = useTransition()
  const { ref, inView } = useInView();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchComment = (page: number) => {
    startTransition(async () => {
      const comments = await getLightnovelComments(contentId, "lightnovel chapter", 10, page)

      if (step > 0) {
        setComments((prev) => [...prev, ...comments.data])
      } else {
        setComments(comments.data ?? [])
      }
    })
  }

  useEffect(() => {
    if (isOpen) {
      fetchComment(step)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, step])

  const [reply, setReply] = useState<{
    replyId: string,
    replyContent: string,
    userName: string,
  } | null>(null)

  useEffect(() => {
    if (inView && !isPending && step < totalComment / 10) {
      setStep((prev) => prev + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, isPending, totalComment])

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
                isPending && step === 0 ? (
                  Array.from({ length: 10 }).map((_, index) => (
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
                    <>
                      {
                        comments.map((comment, index) => (
                          <SlideWithoutScale
                            key={`comment ${comment.id}`}
                            delay={index < 11 ? (index * 0.1) : (index * 0.025)}
                          >
                            <CommentItem
                              authorId={authorId}
                              comment={comment}
                              setReply={setReply}
                            />
                          </SlideWithoutScale>
                        ))
                      }
                      <div ref={ref}></div>

                      {
                        isPending && step > 0 && (
                          <ReloadIcon className="mx-auto mt-3 h-4 w-4 animate-spin" />
                        )
                      }
                    </>
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
          setStep={setStep}
        />
      </SheetContent>
    </Sheet>
  )
}

export default memo(CommentSheet)