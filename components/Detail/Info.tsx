'use client'

import React, { FC, useState } from 'react'
import Link from 'next/link';
import { IoEyeOutline } from 'react-icons/io5';
import { GoHeart } from 'react-icons/go';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { Badge, badgeVariants } from "@/components/ui/badge"
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { slideWithoutScale } from '@/lib/motion';
import AnimeWatchBox from '../Content/AnimeWatchBox';

type IProps = {
  id: string;
  title: string;
  type: "anime" | "manga" | "lightnovel";
  view: number;
  like: number;
  categories: string[];
  description: string;
  eps?: {
    id: string,
    url: string
  }[];
  chaps?: {
    title: string;
    image: string;
    eps: {
      title: string,
      url: string,
      date: string,
    }[]
  }[];
  music?: {
    title: string;
    name: string;
    link: string;
  }[];
  producer: string;
  releaseDate: string;
  current?: number;
  end?: number;
  duration?: number;
  history?: {
    title: string,
    url: string
  };
  auth: {
    id: string;
    image: string;
    name: string;
  }
}

const Info: FC<IProps> = ({
  id,
  title,
  type,
  view,
  like,
  categories,
  description,
  eps,
  chaps,
  music,
  producer,
  releaseDate,
  current,
  end,
  duration,
  history,
  auth
}) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [content, setContent] = React.useState<{
    animeId: string,
    id: string,
    url: string
  }>({
    animeId: id,
    id: "",
    url: ""
  })

  return (
    <>
      <div className='mt-7 flex flex-col gap-7'>
        <div>
          <motion.h2
            className='text-center text-pretty font-semibold text-xl'
            variants={slideWithoutScale}
            custom={0.35}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {title}
          </motion.h2>

          <motion.div
            className='flex gap-4 justify-center'
            variants={slideWithoutScale}
            custom={0.4}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className='flex items-center gap-1'>
              <IoEyeOutline />
              <span className='text-xs'>{view}</span>
            </div>
            <Button
              variant={"ghost"}
              className='group items-center gap-1'
            >
              <GoHeart className="group-hover:text-rose-300 transition-colors" />
              <span className='text-xs'>{like}</span>
            </Button>
          </motion.div>

          <motion.div
            variants={slideWithoutScale}
            custom={0.45}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Link
              className='flex items-center gap-2'
              //TODO: user url
              href={"#"}
            >
              <Avatar>
                <AvatarImage src={auth.image} alt={auth.name} />
                <AvatarFallback>{auth.name}</AvatarFallback>
              </Avatar>
              <p>{auth.name}</p>
              {/* <p className={`text-xs select-none p-2 bg-${type}`}>nhóm dịch</p> */}
              <Badge variant={type}>Nhóm dịch</Badge>
            </Link>
          </motion.div>
        </div>

        <div
          className={`grid grid-cols-1 gap-10 ${type !== "lightnovel" ? "md:grid-cols-[2fr_4fr]" : "md:grid-cols-[3fr_1fr]"}`}>

          {/* Info */}
          <div className='flex flex-col gap-7 md:order-last'>
            {
              history && type === "lightnovel" && (
                <motion.div
                  variants={slideWithoutScale}
                  custom={0.4}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className={`text-${type}`}>Continue</CardTitle>
                      <CardDescription>{type === "lightnovel" ? "Read" : "Watch"} last</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link
                        className={`${badgeVariants({ variant: "outline" })}`}
                        href={history?.url}
                      >
                        <span className='line-clamp-1'>
                          {history?.title}
                        </span>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            }


            <div>
              <p>Categories</p>
              <div className='flex justify-start gap-3 flex-wrap'>
                {
                  categories.map((item, index) => {
                    return (
                      <motion.div
                        key={`category-${index}`}
                        variants={slideWithoutScale}
                        custom={0.45 + (index * 0.1)}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <Link
                          href={"#"}
                          className={badgeVariants({ variant: "outline" })}
                        >
                          {item}
                        </Link>
                      </motion.div>
                    )
                  })
                }
              </div>
            </div>

            <div>
              <motion.p
                className='text-base'
                variants={slideWithoutScale}
                custom={0.65}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <span>Release Date:</span>
                <span>{releaseDate}</span>
              </motion.p>

              <motion.p
                className='text-base'
                variants={slideWithoutScale}
                custom={0.7}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <span>Producer:</span>
                <span>{producer}</span>
              </motion.p>
            </div>

            {
              type === "anime" && (
                <div>
                  <motion.p
                    variants={slideWithoutScale}
                    custom={0.75}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    Music:
                  </motion.p>
                  <div className='flex flex-col gap-3'>
                    {
                      music && music.map((item, index) => {
                        return (
                          <motion.div
                            key={`animemusic-${index}`}
                            variants={slideWithoutScale}
                            custom={0.8 + (index * 0.1)}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            <p>{item.title}</p>
                            {
                              item.link !== "" ? (
                                <a href={item.link} target='_blank'>{item.name}</a>
                              ) : (
                                <p>{item.name}</p>
                              )
                            }
                          </motion.div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            }

            <motion.p
              className='text-xs text-pretty'
              variants={slideWithoutScale}
              custom={0.85}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {description}
            </motion.p>
          </div>

          {/* EP / Chapter */}
          <div className='flex flex-col gap-5'>
            {
              history && type !== "lightnovel" && (
                <motion.div
                  variants={slideWithoutScale}
                  custom={0.4}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className={`text-${type}`}>Continue</CardTitle>
                      <CardDescription>Watch last</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link
                        className={`${badgeVariants({ variant: "outline" })}`}
                        href={history?.url}
                      >
                        <span className='line-clamp-1'>
                          {history?.title}
                        </span>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            }

            <div className='flex flex-col gap-2'>
              {
                type !== "lightnovel" && <p>{type === "anime" ? "Episodes" : "Chapters"}</p>
              }

              {
                type !== "lightnovel" ? (
                  <div className='flex justify-center gap-3 flex-wrap'>
                    {
                      eps && eps.map((item, index) => {
                        return (
                          <motion.div
                            key={`category-${index}`}
                            variants={slideWithoutScale}
                            custom={0.7 + (index * 0.1)}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            {/* <Link
                              href={"#"}
                              className={badgeVariants({ variant: "secondary" })}
                            >
                              {index + 1}
                            </Link> */}
                            <Button
                              size={"sm"}
                              variant={"secondary"}
                              onClick={() => {
                                setOpen(true)
                                setContent({
                                  animeId: id,
                                  ...item
                                })
                              }}
                            >
                              {index + 1}
                            </Button>
                          </motion.div>
                        )
                      })
                    }
                  </div>
                ) : (
                  <div className='flex flex-col justify-start gap-3 flex-wrap'>
                    {
                      chaps && chaps.map((item, index) => {
                        return (
                          <motion.div
                            key={`category-${index}`}
                            variants={slideWithoutScale}
                            custom={0.7 + (index * 0.1)}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            <Card>
                              <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{`${item.eps.length} Chapters`}</CardDescription>
                              </CardHeader>
                              <CardContent className='flex gap-3'>
                                <div className='aspect-[2/3] min-w-[100px] rounded-lg shadow overflow-hidden relative'>
                                  <Image src={item.image} alt={item.title} fill sizes='100%' priority className='object-cover' />
                                </div>

                                <div className='flex flex-col gap-2 w-full'>
                                  {
                                    item.eps.map((ep, index) => {
                                      return (
                                        <Link
                                          key={`${item.title}-${ep.title}`}
                                          href={ep.url}
                                        >
                                          <div
                                            className='flex items-center justify-between w-full'
                                          >
                                            <p className='line-clamp-1'>
                                              {`Chapter ${index + 1}: ${ep.title}`}
                                            </p>

                                            <span className='text-xs text-secondary-foreground'>
                                              {ep.date}
                                            </span>
                                          </div>
                                        </Link>
                                      )
                                    })
                                  }
                                </div>
                              </CardContent>
                            </Card>

                          </motion.div>
                        )
                      })
                    }
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>

      {
        type === "anime" && open && (
          <AnimeWatchBox
            isOpen={open}
            onOpenChange={setOpen}
            content={content}
          />
        )
      }
    </>
  )
}

export default Info