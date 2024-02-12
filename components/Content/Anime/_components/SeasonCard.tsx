import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getTime } from '@/lib/getTime'
import { convertDayOfWeek } from '@/lib/dayOfWeek'
import ContextMenuComponent from '@/components/shared/ContextMenu/ContextMenuComponent'

import { buttonVariants } from "@/components/ui/button"

type IProps = {
  name: string,
  numberOfEpisode: number,
  image?: string,
  studio: string,
  broadcastTime: string,
  broadcastDay: string,
  aired: string,
  animeId: string,
  episodes: {
    id: string,
    content: {
      key: string,
      url: string,
    },
    thumbnail?: {
      key?: string,
      url: string,
    } | null,
    index: string,
  }[],
  id: string,
  poster?: boolean
}

const SeasonCard: FC<IProps> = ({
  name,
  numberOfEpisode,
  image,
  studio,
  broadcastTime,
  broadcastDay,
  aired,
  episodes,
  id,
  animeId,
  poster
}) => {

  return (
    <ContextMenuComponent
      id={id}
      name={name}
      type='anime season'
      poster={poster}
    >
      <Card
      >
        <CardHeader className='flex flex-row gap-4 p-3 items-center'>
          <CardTitle className='text-lg'>{name}</CardTitle>
          <CardDescription className='!m-0'>{`${episodes.length} Episodes`}</CardDescription>
        </CardHeader>
        <CardContent className='flex gap-3 p-4 pt-0'>
          <div className='aspect-[2/3] w-[100px] h-[150px] rounded-lg shadow overflow-hidden relative'>
            <Image
              src={image ? image : "images/image2.jpeg"}
              alt={name}
              fill sizes='100%'
              priority
              className='object-cover'
            />
          </div>

          <div>
            <p className='text-sm'><span className='font-medium'>Studio:</span> {studio}</p>
            <p className='text-sm'><span className='font-medium'>Ngày phát sóng:</span> {aired}</p>
            <p className='text-sm'><span className='font-medium'>Lịch chiếu:</span> {convertDayOfWeek(broadcastDay as DaysOfTheWeek)} lúc {getTime(new Date(broadcastTime))}</p>
            <p className='text-sm'><span className='font-medium'>Tiến độ:</span> {episodes.length}/{numberOfEpisode}</p>
            {
              episodes.length > 0 && (
                <div className='mt-3 flex flex-wrap gap-3'>
                  {
                    episodes.map((ep) => (
                      <div
                        key={ep.id}
                        className='flex items-center gap-3'
                      >
                        <Link
                          href={`/animes/anime/${animeId}/w/${id}?ep=${ep.index}`}
                          className={buttonVariants({ variant: "outline", size: "sm" })}
                        >
                          {ep.index}
                        </Link>
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </CardContent>
      </Card>
    </ContextMenuComponent>
  )
}

export default SeasonCard