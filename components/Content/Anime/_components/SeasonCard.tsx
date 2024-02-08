import React, { FC } from 'react'
import Image from 'next/image'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getTime } from '@/lib/getTime'
import { convertUtcToGMT7 } from '@/lib/convertUtcToGMT7'
import { convertDayOfWeek } from '@/lib/dayOfWeek'
import ContextMenuComponent from '@/components/shared/ContextMenu/ContextMenuComponent'

type IProps = {
  name: string,
  numberOfEpisode: number,
  image?: string,
  studio: string,
  broadcastTime: string,
  broadcastDay: string,
  aired: string,
  episodes: number,
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
          <CardDescription className='!m-0'>{`${episodes} Episodes`}</CardDescription>
        </CardHeader>
        <CardContent className='flex gap-3 p-4 pt-0'>
          <div className='aspect-[2/3] min-w-[100px] rounded-lg shadow overflow-hidden relative'>
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
            <p className='text-sm'><span className='font-medium'>Tiến độ:</span> {episodes}/{numberOfEpisode}</p>
          </div>
        </CardContent>
      </Card>
    </ContextMenuComponent>
  )
}

export default SeasonCard