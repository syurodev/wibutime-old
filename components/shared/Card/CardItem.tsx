import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'
import ContextMenuComponent from '../ContextMenu/ContextMenuComponent'

type IProps = {
  type: ContentType,
  id: string,
  userId?: string,
  currentUserId?: string,
  name: string,
  image: {
    key?: string;
    url: string;
  } | null | undefined,
  current?: number,
  end?: number,
  poster?: boolean,
}

const CardItem: FC<IProps> = ({
  type,
  id,
  name,
  image,
  current,
  end,
  userId,
  currentUserId,
  poster = false
}) => {
  return (
    <ContextMenuComponent
      id={id}
      poster={poster}
      type={type}
      name={name}
    >
      <Link
        href={`/${type}s/${type}/${id}`}
        scroll
      >
        <Card>
          <CardContent className="flex aspect-[2/3] items-center justify-center p-6 relative overflow-hidden rounded-lg shadow">
            <div className='absolute z-10 w-full bottom-0 p-2 bg-background/60 backdrop-blur-lg'>
              <p className='line-clamp-1 font-medium text-sm'>{name}</p>

              <p className='flex gap-1 items-center text-xs uppercase mt-1'>
                <span>
                  {type === "anime" ? "EP" : "CHAP"}
                </span>
                <span className='font-semibold'>
                  {current || "??"}
                </span>
                <span>|</span>
                <span>
                  {end || "??"}
                </span>
              </p>
            </div>
            <Image
              src={image && image.url ? image.url : ""}
              fill
              alt={`${type} - ${name}`}
              sizes='300px'
              className='object-cover'
            />
          </CardContent>
        </Card>
      </Link>
    </ContextMenuComponent>

  )
}

export default CardItem