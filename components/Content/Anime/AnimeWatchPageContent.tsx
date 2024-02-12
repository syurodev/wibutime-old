"use client"

import React, { FC, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { notFound, useSearchParams } from 'next/navigation';
import { LuEye, LuHeart, LuUploadCloud } from 'react-icons/lu';
import { motion } from 'framer-motion';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from '@/components/ui/separator';

import { getSeasonDetail } from '@/actions/anime';
import Image from 'next/image';
import { formatDate } from '@/lib/formatDate';
import Link from 'next/link';
import VideoPlayer from '@/components/shared/VideoPlayer/VideoPlayer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { slideWithoutScale } from '@/lib/motion/slide';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/formatNumber';

type IProps = {
  seasonId: string;
};

const AnimeWatchPageContent: FC<IProps> = ({ seasonId }) => {
  const { data } = useQuery({
    queryKey: ["anime", "season", seasonId],
    queryFn: async () => await getSeasonDetail(seasonId)
  });

  if (!data?.data) {
    notFound();
  }

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
  } | undefined>(epIndex ? data.data.episode.find(item => item.index === epIndex) : data.data.episode[0])

  useEffect(() => {
    setEpisode(data.data.episode.find(item => item.index === epIndex) || data.data.episode[0])
  }, [data.data.episode, epIndex])

  return (
    <div className='mt-8 w-full flex flex-col gap-3'>
      <div className='w-full flex flex-col lg:flex-row gap-4 lg:gap-8'>
        <div className='w-full flex-[3] flex flex-col gap-3'>
          <motion.div
            variants={slideWithoutScale}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <VideoPlayer src={episode?.content.url || ""} />
          </motion.div>

          <motion.h5
            variants={slideWithoutScale}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={0.1}
            className='text-balance'
          >
            {data.data.name} :: {episode?.index}
          </motion.h5>

          <div className='flex items-center gap-3 justify-between'>
            <motion.div
              variants={slideWithoutScale}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.2}
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
              custom={0.25}
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
                  {formatNumber(data.data.anime.favorite.length)}
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
              custom={0.35}
            >
              <Avatar className='size-12'>
                <AvatarImage src={data.data.anime.user.image ? data.data.anime.user.image : "/images/default-avatar.webp"} alt={data.data.anime.user.name} />
                <AvatarFallback>{data.data.anime.user.name}</AvatarFallback>
              </Avatar>

              <div>
                <p className='font-semibold text-sm'>{data.data.anime.user.name}</p>
                <p className='text-xs text-secondary-foreground'>{data.data.anime.user.followedUsers.length} theo dõi</p>
              </div>
            </motion.div>

            {
              data.data.anime.translationGroup && data.data.anime.translationGroup.id !== "" && (
                <>
                  <Separator orientation="vertical" className='h-8' />

                  <motion.div
                    className='flex gap-2 items-center'
                    variants={slideWithoutScale}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={0.4}
                  >
                    <Avatar className='size-12'>
                      <AvatarImage src={data.data.anime.user.image ? data.data.anime.user.image : "/images/default-avatar.webp"} alt={data.data.anime.user.name} />
                      <AvatarFallback>{data.data.anime.user.name}</AvatarFallback>
                    </Avatar>

                    <div>
                      <p className='font-semibold text-sm'>{data.data.anime.user.name}</p>
                      <p className='text-xs text-secondary-foreground'>{data.data.anime.user.followedUsers.length} theo dõi</p>
                    </div>
                  </motion.div>
                </>
              )
            }
          </div>

          {/* comment */}
          <motion.div
            variants={slideWithoutScale}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={0.55}
          >
            <Accordion
              type="single"
              className="w-full border px-4 rounded-xl"
              defaultValue="episodes"
              collapsible
            >
              <AccordionItem
                value="episodes"
              >
                <AccordionTrigger className='text-sm font-semibold'>
                  Bình luận
                </AccordionTrigger>
                <ScrollArea className="h-full max-h-[500px] w-full rounded-md">
                  <AccordionContent
                    className="flex items-start gap-3 mb-2"
                  >
                    comment
                  </AccordionContent>
                </ScrollArea>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>

        <motion.div
          className='w-full flex-[1]'
          variants={slideWithoutScale}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={0.45}
        >
          <Accordion
            type="single"
            className="w-full border px-4 rounded-xl backdrop-blur-md bg-background/30"
            defaultValue="episodes"
            collapsible
          >
            <AccordionItem
              value="episodes"
            >
              <AccordionTrigger className='text-sm font-semibold'>
                Episodes ({data.data.episode.length})
              </AccordionTrigger>
              <ScrollArea className="h-full max-h-[500px] w-full rounded-md">
                {
                  data.data.episode.map((ep, index) => (
                    <Link
                      key={ep.id}
                      href={`?ep=${ep.index}`}
                    >
                      <AccordionContent
                        className={`flex items-start gap-3 ${epIndex === ep.index ? "bg-secondary hover:bg-secondary" : ""} ${index === data.data.episode.length - 1 ? "mb-4" : "mb-2"}`}
                      >
                        <div className='relative w-24 rounded-lg overflow-hidden aspect-video'>
                          {
                            ep.thumbnail ? (
                              <Image
                                src={ep.thumbnail?.url}
                                alt={ep.index}
                                className='object-cover'
                                fill
                                sizes='full'
                              />
                            ) : (
                              <p>{ep.index}</p>
                            )
                          }
                        </div>

                        <div className='flex flex-col'>
                          <p className='text-sm font-semibold'>{ep.index}</p>
                          <p className='text-xs text-secondary-foreground'>{ep.viewed} lượt xem</p>
                          <p className='text-xs text-secondary-foreground'>{ep.createdAt ? formatDate(ep.createdAt.toISOString()) : ""}</p>
                        </div>
                      </AccordionContent>
                    </Link>
                  ))
                }

              </ScrollArea>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimeWatchPageContent;
