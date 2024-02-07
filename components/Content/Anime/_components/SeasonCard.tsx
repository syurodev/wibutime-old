import React, { FC } from 'react'
import Image from 'next/image'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getTime } from '@/lib/getTime'
import { convertUtcToGMT7 } from '@/lib/convertUtcToGMT7'
import { convertDayOfWeek } from '@/lib/dayOfWeek'

type IProps = {
  name: string,
  numberOfEpisode: number,
  image?: string,
  studio: string,
  broadcastTime: string,
  broadcastDay: string,
  aired: string,
}

const SeasonCard: FC<IProps> = ({
  name,
  numberOfEpisode,
  image,
  studio,
  broadcastTime,
  broadcastDay,
  aired,
}) => {

  return (
    <Card
    >
      <CardHeader className='flex flex-row gap-4 p-3 items-center'>
        <CardTitle className='text-lg'>{name}</CardTitle>
        <CardDescription className='!m-0'>{`${numberOfEpisode} Episodes`}</CardDescription>
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
          <p>Studio: {studio}</p>
          <p>Ngày phát sóng: {aired}</p>
          <p>Lịch chiếu: {convertDayOfWeek(broadcastDay as DaysOfTheWeek)} lúc {getTime(convertUtcToGMT7(new Date(broadcastTime)))}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default SeasonCard