"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { badgeVariants } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { LuPaintbrush, LuPencil, LuCaseSensitive, LuHeart, LuEye } from "react-icons/lu";
import { motion } from 'framer-motion'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { slide, slideWithoutScale } from '@/lib/motion/slide'
import { formatDate } from '@/lib/formatDate'
import RenderEditorContent from '@/components/shared/TextEditor/RenderEditorContent'


type IProps = {
  data: LightnovelDetail
}

const LightnovelDetail: FC<IProps> = ({ data }) => {


  return (
    <div className='w-screen h-dvh absolute left-0 top-0'>

      <ResizablePanelGroup direction="horizontal" className='!hidden md:!flex'>
        <ResizablePanel className="min-w-[30%] max-w-[50%] relative shadow-lg">
          <div
            className='flex flex-col items-center justify-center gap-3 w-full h-full bg-background/60 backdrop-blur-2xl pt-16 pb-2 px-3'
          >
            <div className='w-full flex items-center justify-center gap-10 absolute top-20'>
              {/* user */}
              <motion.div
                variants={slideWithoutScale}
                custom={0.1}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Link
                  className='flex items-center gap-2'
                  href={`/u/${data.user.id}`}
                >
                  <Avatar className='size-8'>
                    <AvatarImage src={data.user.image || "/images/default-avatar.webp"} alt={data.user.name} />
                    <AvatarFallback>{data.user.name}</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col items-start justify-start'>
                    <p className='font-semibold text-sm'>{data.user.name}</p>
                    <p className="text-xs select-none text-secondary-foreground">Người dịch</p>
                  </div>
                </Link>
              </motion.div>

              {
                data.translationGroup && (
                  <motion.div
                    variants={slideWithoutScale}
                    custom={0.15}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Link
                      className='flex items-center gap-2'
                      href={`/u/${data.translationGroup.id}`}
                    >
                      <Avatar className='size-8'>
                        <AvatarImage src={data.translationGroup?.image?.url || "/images/default-avatar.webp"} alt={data.translationGroup.name} />
                        <AvatarFallback>{data.translationGroup.name}</AvatarFallback>
                      </Avatar>
                      <p className='font-semibold text-sm'>{data.translationGroup.name}</p>
                      <p className="text-xs select-none text-secondary-foreground">Nhóm dịch</p>
                    </Link>
                  </motion.div>
                )
              }
            </div>

            {/* Image */}
            <motion.div
              className='aspect-[2/3] w-full max-w-[38%] relative rounded-lg overflow-hidden shadow-xl'
              variants={slide}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Image
                src={data.image ? data.image.url : "/images/default-content-image.jpeg"}
                alt={data.name}
                fill
                sizes='100%'
                priority
                className='object-cover'
              />
            </motion.div>

            <motion.p
              className='uppercase font-semibold text-center'
              variants={slideWithoutScale}
              custom={0.1}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {data.name}
            </motion.p>

            <motion.div
              className='flex gap-4 justify-center -my-3'
              variants={slideWithoutScale}
              custom={0.2}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Button
                className='items-center gap-1'
                variant={"ghost"}
              >
                <LuCaseSensitive className="text-xl" />
                <span className='text-xs'>{data.words}</span>
              </Button>
              <Button
                className='items-center gap-1'
                variant={"ghost"}
              >
                <LuEye />
                <span className='text-xs'>{data.viewed}</span>
              </Button>
              <Button
                variant={"ghost"}
                className='group items-center gap-1'
              >
                <LuHeart className="group-hover:text-rose-300 transition-colors" />
                <span className='text-xs'>{data.favorites.length}</span>
              </Button>
            </motion.div>

            {/* Categories */}
            <div className='flex justify-start gap-3 flex-wrap max-w-[75%]'>
              {
                data.categories.map((item, index) => {
                  return (
                    <motion.div
                      key={`category-${index}`}
                      variants={slideWithoutScale}
                      custom={0.3 + (index * 0.1)}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Link
                        href={"#"}
                        className={badgeVariants({ variant: "default" })}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                })
              }
            </div>

            <div className='flex items-center gap-8 absolute bottom-2 font-semibold'>
              {
                data.author && (
                  <motion.div
                    className='text-sm text-secondary-foreground flex items-center gap-1'
                    variants={slideWithoutScale}
                    custom={0.5}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <LuPencil />
                    <span>{data.author}</span>
                  </motion.div>
                )
              }

              {
                data.artist && (
                  <motion.div
                    className='text-sm text-secondary-foreground flex items-center gap-1'
                    variants={slideWithoutScale}
                    custom={0.6}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <LuPaintbrush />
                    <span>{data.artist}</span>
                  </motion.div>
                )
              }
            </div>
          </div>

          <Image
            src={data.image ? data.image.url : "/images/default-content-image.jpeg"}
            alt={data.name}
            fill
            sizes='100%'
            priority
            className='object-cover -z-10'
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="pt-20 pb-2 px-7 flex flex-col gap-3 !overflow-y-auto">
          {/* orther name */}
          {
            data.otherNames.length > 0 && (
              <motion.div
                variants={slideWithoutScale}
                custom={0.35}
                initial="initial"
                animate="animate"
                exit="exit"
                className='rounded-lg border p-4 bg-background shadow'
              >
                <p className='font-semibold text-sm mb-2'>Tên khác:</p>
                {
                  data.otherNames.map((name) => (
                    <p
                      key={name}
                      className='text-sm'
                    >
                      {name}
                    </p>
                  ))
                }
              </motion.div>
            )
          }

          {/* summary */}
          <motion.div
            variants={slideWithoutScale}
            custom={0.35}
            initial="initial"
            animate="animate"
            exit="exit"
            className='rounded-lg border p-4 bg-background shadow'
          >
            <p className='font-semibold text-sm mb-2'>Tóm tắt:</p>
            {
              data.summary &&
              <RenderEditorContent content={data.summary} fontSize='text-sm' />
            }
          </motion.div>

          {/* note */}
          <motion.div
            variants={slideWithoutScale}
            custom={0.45}
            initial="initial"
            animate="animate"
            exit="exit"
            className='rounded-lg border p-4 bg-background shadow'
          >
            <p className='font-semibold text-sm mb-2'>Ghi chú:</p>
            {
              data.note &&
              <RenderEditorContent content={data.note} fontSize='text-sm' />
            }
          </motion.div>

          {/* Volume */}
          <div className='flex flex-col justify-start gap-3 flex-wrap'>
            {
              data.volumes && data.volumes.map((item, index) => {
                return (
                  <motion.div
                    key={`category-${index}`}
                    variants={slideWithoutScale}
                    custom={0.3 + (index * 0.1)}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Card
                    >
                      <CardHeader className='flex flex-row gap-4 p-3 items-center'>
                        <CardTitle className='text-lg'>{item.name}</CardTitle>
                        <CardDescription className='!m-0'>{`${item.chapters.length} Chapters`}</CardDescription>
                      </CardHeader>
                      <CardContent className='flex gap-3 p-4 pt-0'>
                        <div className='aspect-[2/3] min-w-[100px] rounded-lg shadow overflow-hidden relative flex items-center justify-center bg-secondary p-3'>
                          {
                            item.image && item.image.url !== "" ? (
                              <Image
                                src={item.image.url}
                                alt={item.name}
                                fill sizes='100%'
                                priority
                                className='object-cover'
                              />
                            ) : (
                              <div className='flex flex-col items-center'>
                                <p
                                  className='uppercase text-sm font-semibold text-secondary-foreground text-center'
                                >
                                  Volume
                                </p>
                                <p
                                  className='uppercase text-3xl font-semibold text-secondary-foreground text-center'
                                >
                                  {index + 1}
                                </p>
                              </div>
                            )
                          }
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                          {
                            item.chapters.map((chapter, index) => {
                              return (
                                <Link
                                  key={`${item.name}-${chapter.name}`}
                                  href={`/lightnovels/lightnovel/${data.id}/r/${chapter.id}`}
                                >
                                  <div
                                    className='flex items-center justify-between w-full gap-2'
                                  >
                                    <p className='line-clamp-1 text-sm'>
                                      {chapter.name}
                                    </p>

                                    <span className='text-xs text-secondary-foreground'>
                                      {formatDate(chapter.createdAt)}
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

        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Mobile */}
      <div className='md:!hidden w-full flex flex-col gap-4'>
        <div className='w-full h-dvh flex flex-col items-center'>
          <div
            className='flex flex-col items-center justify-center gap-3 w-full px-3 h-full bg-background/60 backdrop-blur-2xl pt-16 pb-2'
          >
            <div className='w-full flex items-center justify-center gap-10 absolute top-20'>
              {/* user */}
              <motion.div
                variants={slideWithoutScale}
                custom={0.1}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Link
                  className='flex items-center gap-2'
                  href={`/u/${data.user.id}`}
                >
                  <Avatar className='size-8'>
                    <AvatarImage src={data.user.image || "/images/default-avatar.webp"} alt={data.user.name} />
                    <AvatarFallback>{data.user.name}</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col items-start justify-start'>
                    <p className='font-semibold text-sm'>{data.user.name}</p>
                    <p className="text-xs select-none text-secondary-foreground">Người dịch</p>
                  </div>
                </Link>
              </motion.div>

              {
                data.translationGroup && (
                  <motion.div
                    variants={slideWithoutScale}
                    custom={0.15}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Link
                      className='flex items-center gap-2'
                      href={`/u/${data.translationGroup.id}`}
                    >
                      <Avatar className='size-8'>
                        <AvatarImage src={data.translationGroup?.image?.url || "/images/default-avatar.webp"} alt={data.translationGroup.name} />
                        <AvatarFallback>{data.translationGroup.name}</AvatarFallback>
                      </Avatar>
                      <p className='font-semibold text-sm'>{data.translationGroup.name}</p>
                      <p className="text-xs select-none text-secondary-foreground">Nhóm dịch</p>
                    </Link>
                  </motion.div>
                )
              }
            </div>

            {/* Image */}
            <motion.div
              className='aspect-[2/3] w-full max-w-[65%] relative rounded-lg overflow-hidden shadow-xl'
              variants={slide}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Image
                src={data.image ? data.image.url : "/images/default-content-image.jpeg"}
                alt={data.name}
                fill
                sizes='100%'
                priority
                className='object-cover'
              />
            </motion.div>

            <motion.p
              className='uppercase font-semibold text-center'
              variants={slideWithoutScale}
              custom={0.1}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {data.name}
            </motion.p>

            <motion.div
              className='flex gap-4 justify-center -my-3'
              variants={slideWithoutScale}
              custom={0.2}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Button
                className='items-center gap-1'
                variant={"ghost"}
              >
                <LuCaseSensitive className="text-xl" />
                <span className='text-xs'>{data.words}</span>
              </Button>
              <Button
                className='items-center gap-1'
                variant={"ghost"}
              >
                <LuEye />
                <span className='text-xs'>{data.viewed}</span>
              </Button>
              <Button
                variant={"ghost"}
                className='group items-center gap-1'
              >
                <LuHeart className="group-hover:text-rose-300 transition-colors" />
                <span className='text-xs'>{data.favorites.length}</span>
              </Button>
            </motion.div>

            {/* Categories */}
            <div className='flex justify-start gap-3 flex-wrap max-w-[75%]'>
              {
                data.categories.map((item, index) => {
                  return (
                    <motion.div
                      key={`category-${index}`}
                      variants={slideWithoutScale}
                      custom={0.3 + (index * 0.1)}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Link
                        href={"#"}
                        className={badgeVariants({ variant: "default" })}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                })
              }
            </div>

            <div className='flex items-center gap-8 absolute bottom-2 font-semibold'>
              {
                data.author && (
                  <motion.div
                    className='text-sm text-secondary-foreground flex items-center gap-1'
                    variants={slideWithoutScale}
                    custom={0.5}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <LuPencil />
                    <span>{data.author}</span>
                  </motion.div>
                )
              }

              {
                data.artist && (
                  <motion.div
                    className='text-sm text-secondary-foreground flex items-center gap-1'
                    variants={slideWithoutScale}
                    custom={0.6}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <LuPaintbrush />
                    <span>{data.artist}</span>
                  </motion.div>
                )
              }
            </div>
          </div>

          <Image
            src={data.image ? data.image.url : "/images/default-content-image.jpeg"}
            alt={data.name}
            fill
            sizes='100%'
            priority
            className='object-cover -z-10'
          />
        </div>

        {/* note */}
        <motion.div
          variants={slideWithoutScale}
          custom={0.25}
          initial="initial"
          animate="animate"
          exit="exit"
          className='rounded-lg border p-4 bg-background shadow mx-4'
        >
          <p className='font-semibold text-sm'>Ghi chú:</p>
          {
            data.note &&
            <RenderEditorContent content={data.note} fontSize='text-sm' />
          }
        </motion.div>

        {/* summary */}
        <motion.div
          variants={slideWithoutScale}
          custom={0.35}
          initial="initial"
          animate="animate"
          exit="exit"
          className='rounded-lg border p-4 bg-background shadow mx-4'
        >
          <p className='font-semibold text-sm'>Tóm tắt:</p>
          {
            data.summary &&
            <RenderEditorContent content={data.summary} fontSize='text-sm' />
          }
        </motion.div>

        {/* Volume */}
        <div className='flex flex-col justify-start gap-3 flex-wrap mx-4'>
          {
            data.volumes && data.volumes.map((item, index) => {
              return (
                <motion.div
                  key={`category-${index}`}
                  variants={slideWithoutScale}
                  custom={0.3 + (index * 0.1)}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Card
                  >
                    <CardHeader className='flex flex-row gap-4 p-3 items-center'>
                      <CardTitle className='text-lg'>{item.name}</CardTitle>
                      <CardDescription className='!m-0'>{`${item.chapters.length} Chapters`}</CardDescription>
                    </CardHeader>
                    <CardContent className='flex gap-3 p-4 pt-0'>
                      <div className='aspect-[2/3] min-w-[100px] rounded-lg shadow overflow-hidden relative'>
                        <Image
                          src={item.image ? item.image.url : "images/image2.jpeg"}
                          alt={item.name}
                          fill sizes='100%'
                          priority
                          className='object-cover'
                        />
                      </div>

                      <div className='flex flex-col gap-2 w-full'>
                        {
                          item.chapters.map((chapter, index) => {
                            return (
                              <Link
                                key={`${item.name}-${chapter.name}`}
                                href={`/lightnovels/lightnovel/${data.id}/r/${chapter.id}`}
                              >
                                <div
                                  className='flex items-center justify-between w-full gap-2'
                                >
                                  <p className='line-clamp-1 text-sm'>
                                    {chapter.name}
                                  </p>

                                  <span className='text-xs text-secondary-foreground'>
                                    {formatDate(chapter.createdAt)}
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
      </div>
    </div>
  )
}

export default LightnovelDetail