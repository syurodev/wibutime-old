"use client"

import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LuEye, LuHeart } from 'react-icons/lu';
import { motion } from 'framer-motion';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Separator } from '@/components/ui/separator';

import Image from 'next/image';
import { formatDate } from '@/lib/formatDate';
import VideoPlayer from '@/components/shared/VideoPlayer/VideoPlayer';
import { slideWithoutScale } from '@/lib/motion/slide';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/formatNumber';
import EpisodeList from './_components/EpisodeList';
import Comments from './_components/Comments';
import { convertDayOfWeek } from '@/lib/dayOfWeek';
import { getTime } from '@/lib/getTime';
import MusicList from './_components/MusicList';

type IProps = {
  data: SeasonDetail
};

const AnimeWatchPageContent: FC<IProps> = ({ data }) => {
  const searchParams = useSearchParams()
  const epIndex = searchParams.get('ep')

  const [episode, setEpisode] = useState<{
    id: string,
    createdAt: Date | null,
    updatedAt: Date | null,
    deleted: boolean | null,
    content: {
      url: string,
    },
    viewed: number | null,
    viewed_at: Date | null,
    thumbnail?: {
      url: string,
    } | undefined,
    index: string,
    seasonId: string,
  } | undefined>(epIndex ? data.episode.find(item => item.index === epIndex) : data.episode[0])

  useEffect(() => {
    setEpisode(data.episode.find(item => item.index === epIndex) || data.episode[0])
  }, [data.episode, epIndex])

  return (
    <div className='mt-8 w-full flex flex-col gap-3'>
      <div className='w-full flex gap-3 mb-2'>
        <motion.div
          className='relative min-w-[200px] h-[300px] rounded-lg overflow-hidden shadow'
          variants={slideWithoutScale}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Image
            src={data.image?.url ?? "/images/default-content-image.webp"}
            alt={`${data.name} - image`}
            className="object-cover"
            fill
          />
        </motion.div>

        <motion.div
          className='flex flex-col gap-1'
          variants={slideWithoutScale}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={0.1}
        >
          <p className='font-semibold text-lg'>{data.name}</p>
          <p className='text-sm'><span className='font-semibold'>Studio:</span> {data.studio}</p>
          <p className='text-sm'><span className='font-semibold'>Ngày phát sóng:</span> {formatDate(data.aired)}</p>
          <p className='text-sm'><span className='font-semibold'>Lịch chiếu:</span> {convertDayOfWeek(data.broadcastDay as DaysOfTheWeek)} lúc {getTime(new Date(data.broadcastTime))}</p>
          <p className='text-sm'><span className='font-semibold'>Tiến độ:</span> {data.episode.length}/{data.numberOfEpisodes}</p>

          <MusicList data={data.musics ?? null} />
        </motion.div>
      </div>

      <div className='w-full flex flex-col lg:flex-row gap-5'>
        <div className='w-full flex-[4] flex flex-col gap-3'>
          <motion.div
            variants={slideWithoutScale}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={0.2}
          >
            <VideoPlayer src={episode?.content.url || ""} />
          </motion.div>

          <motion.h5
            variants={slideWithoutScale}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={0.25}
            className='text-balance'
          >
            {data.name} :: {episode?.index}
          </motion.h5>

          <div className='flex items-center gap-3 justify-between'>
            <motion.div
              variants={slideWithoutScale}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.3}
            >
              <Button
                variant={"ghost"}
                rounded={"full"}
                className='flex items-center gap-2'
              >
                <LuEye />
                <span className='text-sm font-semibold'>{formatNumber(episode?.viewed || 0)}</span>
              </Button>
            </motion.div>

            <motion.div
              variants={slideWithoutScale}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.35}
            >
              <Button
                className='flex items-center gap-2 w-28'
                rounded={"full"}
                variant={"secondary"}
              >
                <LuHeart />
                <span
                  className='text-sm font-semibold'
                >
                  {formatNumber(data.anime.favorites.length)}
                </span>
              </Button>
            </motion.div>

            {/* <div className='flex items-center gap-3'>
              <motion.div
                variants={slideWithoutScale}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.25}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                    <Button
                  className='flex items-center gap-2 w-28'
                  rounded={"full"}
                  variant={"secondary"}
                >
                  <LuUploadCloud />
                  <span className='text-sm font-semibold'>{episode?.viewed}</span>
                </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-secondary'>
                      <p className='text-primary text-sm font-semibold'>{episode?.viewed}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            </div> */}
          </div>

          {/* User */}
          <div className='flex items-center justify-between'>
            <motion.div
              className='flex gap-2 items-center'
              variants={slideWithoutScale}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.4}
            >
              <Avatar className='size-12'>
                <AvatarImage src={data.anime.user.image ? data.anime.user.image : "/images/default-avatar.webp"} alt={data.anime.user.name} />
                <AvatarFallback>{data.anime.user.name}</AvatarFallback>
              </Avatar>

              <div>
                <p className='font-semibold text-sm'>{data.anime.user.name}</p>
                <p className='text-xs text-secondary-foreground'>{data.anime.user.followedUsers.length} theo dõi</p>
              </div>
            </motion.div>

            {
              data.anime.translationGroup && data.anime.translationGroup.id !== "" && (
                <>
                  <Separator orientation="vertical" className='h-8' />

                  <motion.div
                    className='flex gap-2 items-center'
                    variants={slideWithoutScale}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={0.45}
                  >
                    <Avatar className='size-12'>
                      <AvatarImage src={data.anime.user.image ? data.anime.user.image : "/images/default-avatar.webp"} alt={data.anime.user.name} />
                      <AvatarFallback>{data.anime.user.name}</AvatarFallback>
                    </Avatar>

                    <div>
                      <p className='font-semibold text-sm'>{data.anime.user.name}</p>
                      <p className='text-xs text-secondary-foreground'>{data.anime.user.followedUsers.length} theo dõi</p>
                    </div>
                  </motion.div>
                </>
              )
            }
          </div>

          {/* Episode list - only mobile */}
          <motion.div
            className='w-full flex-[2] lg:hidden'
            variants={slideWithoutScale}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={0.5}
          >
            <EpisodeList
              episodes={data.episode}
              epIndex={epIndex || ""}
            />
          </motion.div>

          {/* comment */}
          <motion.div
            variants={slideWithoutScale}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={0.55}
          >
            <Comments episodeId={episode?.id!} />
          </motion.div>
        </div>


        {/* only pc */}
        <motion.div
          className='w-full flex-[1.5] min-w-[350px] hidden lg:block'
          variants={slideWithoutScale}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={0.45}
        >
          <EpisodeList
            episodes={data.episode}
            epIndex={epIndex || ""}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AnimeWatchPageContent;
