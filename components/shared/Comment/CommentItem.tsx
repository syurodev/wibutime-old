"use client"

import React, { FC, useTransition } from 'react'
import { LuCrown, LuFlag, LuHeart, LuReply } from 'react-icons/lu'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { toggleFavotiteCommentAction } from '@/actions/comment'
import { ReloadIcon } from '@radix-ui/react-icons'
import { usePathname } from 'next/navigation'
import { compareTime } from '@/lib/compareTime'

type IProps = {
  comment: CommentData,
  authorId: string,
  setReply: React.Dispatch<React.SetStateAction<{
    replyId: string;
    userName: string;
    replyContent: string;
  } | null>>
}

const CommentItem: FC<IProps> = ({
  comment,
  authorId,
  setReply
}) => {
  const [isPending, startTransition] = useTransition()
  const pathName = usePathname()

  const handleFavorite = (commentId: string) => {
    startTransition(async () => {
      await toggleFavotiteCommentAction(commentId, comment.isFavorite, pathName)
    })
  }

  return (
    <div className='w-full bg-secondary dark:bg-secondary/20 p-2 rounded-xl'>
      <div
        className={`w-full flex items-start space-x-4 ${comment.uncomplete && "animate-pulse"}`}
      >
        <Avatar className='border'>
          <AvatarImage src={comment.user.image ?? "/images/default-avatar.webp"} alt={comment.user.name} className="h-10 w-10 object-cover" />
        </Avatar>
        <div className='w-full'>
          <div className='flex gap-1 items-center'>
            <span className='text-sm font-semibold'>
              {comment.user.name}
            </span>
            {
              comment.user.id === authorId && (<LuCrown />)
            }
          </div>
          <p className='text-sm'>{comment.comment}</p>

          <div className='grid grid-cols-4 gap-1 items-center'>
            <p className='text-xs dark:text-secondary text-secondary-foreground/80 font-semibold whitespace-nowrap'>{compareTime(comment.createdAt)}</p>

            <Button
              variant={"ghost"}
              size={"sm"}
              rounded={"full"}
              disabled={isPending}
              onClick={() => handleFavorite(comment.id)}
            >
              <span className='mr-2 font-semibold'>{comment.favoriteNumber}</span>
              {
                isPending ?
                  <ReloadIcon className="h-4 w-4 animate-spin" />
                  : <LuHeart className={comment.isFavorite ? "text-rose-500" : "text-primary"} />
              }
            </Button>
            <Button
              variant={"ghost"}
              size={"sm"}
              rounded={"full"}
              onClick={() => setReply({
                replyContent: comment.comment,
                replyId: comment.id,
                userName: comment.user.name
              })}
            >
              <span className='mr-2 font-semibold'>{comment.replies?.length ?? 0}</span>
              <LuReply />
            </Button>
            <Button
              variant={"ghost"}
              size={"icon"}
              rounded={"full"}
            >
              <LuFlag />
            </Button>
          </div>
        </div>
      </div>

      <div className='mt-2 pr-4'>
        {
          comment.replies && comment.replies.length > 0 && comment.replies.map((reply) => (
            <div
              key={reply.id}
              className="flex items-start space-x-4 ml-6 w-full"
            >
              <Avatar className='border'>
                <AvatarImage src={reply.user.image ?? "/images/default-avatar.webp"} alt={reply.user.name} className="h-10 w-10 object-cover" />
              </Avatar>
              <div className='w-full'>
                <div className='flex gap-1 items-center'>
                  <span className='text-sm font-semibold'>
                    {reply.user.name}
                  </span>
                  {
                    reply.user.id === authorId && (<LuCrown />)
                  }
                </div>
                <p className='text-sm'>{reply.comment}</p>

                <div className='grid grid-cols-3 gap-1 items-center w-full'>
                  <p className='text-xs dark:text-secondary text-secondary-foreground/80 font-semibold'>{compareTime(reply.createdAt)}</p>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    rounded={"full"}
                    disabled={isPending}
                    onClick={() => handleFavorite(reply.id)}
                  >
                    <span className='mr-2 font-semibold'>{reply.favoriteNumber}</span>
                    {
                      isPending ?
                        <ReloadIcon className="h-4 w-4 animate-spin" />
                        : <LuHeart className={reply.isFavorite ? "text-rose-500" : "text-primary"} />
                    }
                  </Button>
                  {/* <Button
                  variant={"ghost"}
                  size={"icon"}
                  rounded={"full"}
                  onClick={() => setReply({
                    replyContent: comment.comment,
                    replyId: comment.id,
                    userName: comment.user.name
                  })}
                >
                  <LuReply />
                </Button> */}
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    rounded={"full"}
                  >
                    <LuFlag />
                  </Button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CommentItem