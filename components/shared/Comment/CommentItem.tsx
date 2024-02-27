import React, { FC } from 'react'
import { LuCrown } from 'react-icons/lu'

import { Avatar, AvatarImage } from '@/components/ui/avatar'

type IProps = {
  comment: CommentData,
  authorId: string
}

const CommentItem: FC<IProps> = ({
  comment,
  authorId
}) => {
  return (
    <div
      className={`flex items-start space-x-4 ${comment.uncomplete && "animate-pulse"}`}
    >
      <Avatar>
        <AvatarImage src={comment.user.image ?? "/images/default-avatar.webp"} alt={comment.user.name} className="h-12 w-12" />
      </Avatar>
      <div>
        <div className='flex gap-1 items-center'>
          <span className='text-sm font-semibold'>
            {comment.user.name}
          </span>
          {
            comment.user.id === authorId && (<LuCrown />)
          }
        </div>
        <p className='text-sm'>{comment.comment}</p>
      </div>
    </div>
  )
}

export default CommentItem