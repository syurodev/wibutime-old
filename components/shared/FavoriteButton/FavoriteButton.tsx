"use client"
import { setFavorite } from '@/actions/favorite'
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import React, { FC, useTransition } from 'react'
import { LuHeart } from 'react-icons/lu'

type IProps = {
  action: "favo" | "unfavo",
  type: ContentType,
  favoriteNumber: number,
  favorited: boolean,
  userId?: string,
  contentId: string,
}

const FavoriteButton: FC<IProps> = ({
  action,
  type,
  favoriteNumber,
  userId,
  favorited,
  contentId,
}) => {
  const [isPending, startTransition] = useTransition()

  const handleFavorite = () => {
    startTransition(async () => {
      if (!userId) return

      await setFavorite(favorited ? "unfavo" : "favo", type, userId, contentId)
    })
  }

  return (


    <Button
      variant={"ghost"}
      className='group items-center gap-1'
      disabled={isPending}
      onClick={handleFavorite}
    >
      {isPending
        ? <ReloadIcon className="animate-spin" />
        : <LuHeart className={`group-hover:text-rose-300 transition-colors ${favorited ? "text-rose-600" : "text-primary"}`} />
      }

      <span className='text-xs'>{favoriteNumber}</span>
    </Button>
  )
}

export default FavoriteButton