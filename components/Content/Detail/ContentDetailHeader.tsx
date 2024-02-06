'use client'

import React, { FC } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { LuCaseSensitive, LuEye, LuHeart, LuPaintbrush, LuPencil, LuVideo } from 'react-icons/lu'
import Image from 'next/image'

import { slide, slideWithoutScale } from '@/lib/motion/slide'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { badgeVariants } from '@/components/ui/badge'

type IProps = {
  user: {
    id: string,
    image?: string | null,
    name: string
  },
  translationGroup?: {
    id: string;
    image: {
      key?: string | undefined;
      url: string;
    } | null;
    name: string;
  },
  image?: string,
  name: string,
  words?: string,
  viewed: string,
  favorites: number
  categories: {
    id: string,
    name: string
  }[],
  author?: string | null
  artist?: string | null
  studio?: string | null
}

const ContentDetailHeader: FC<IProps> = ({
  user,
  translationGroup,
  image,
  name,
  words,
  viewed,
  favorites,
  categories,
  author,
  artist,
  studio
}) => {
  return (
    <div className='w-full h-dvh md:max-w-[50%] lg:max-w-[40%] min-w-[350px] flex flex-col items-center relative'>
      <div
        className='flex flex-col items-center justify-center gap-3 w-full px-3 h-full bg-background/60 backdrop-blur-2xl pt-[120px] pb-16'
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
              href={`/u/${user.id}`}
            >
              <Avatar className='size-8'>
                <AvatarImage src={user.image || "/images/default-avatar.webp"} alt={user.name} />
                <AvatarFallback>{user.name}</AvatarFallback>
              </Avatar>
              <div className='flex flex-col items-start justify-start'>
                <p className='font-semibold text-sm'>{user.name}</p>
                <p className="text-xs select-none text-secondary-foreground">Người dịch</p>
              </div>
            </Link>
          </motion.div>

          {
            translationGroup && (
              <motion.div
                variants={slideWithoutScale}
                custom={0.15}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Link
                  className='flex items-center gap-2'
                  href={`/u/${translationGroup.id}`}
                >
                  <Avatar className='size-8'>
                    <AvatarImage src={translationGroup?.image ? translationGroup?.image.url : "/images/default-avatar.webp"} alt={translationGroup.name} />
                    <AvatarFallback>{translationGroup.name}</AvatarFallback>
                  </Avatar>
                  <p className='font-semibold text-sm'>{translationGroup.name}</p>
                  <p className="text-xs select-none text-secondary-foreground">Nhóm dịch</p>
                </Link>
              </motion.div>
            )
          }
        </div>

        {/* Image */}
        <motion.div
          className='aspect-[2/3] w-full max-w-[54%] max-h-[81%] lg:max-w-[46%] lg:max-h-[69%] relative rounded-lg overflow-hidden shadow-xl'
          variants={slide}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Image
            src={image ? image : "/images/default-content-image.jpeg"}
            alt={name}
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
          {name}
        </motion.p>

        <motion.div
          className='flex gap-4 justify-center -my-3'
          variants={slideWithoutScale}
          custom={0.2}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {
            words && (
              <Button
                className='items-center gap-1'
                variant={"ghost"}
              >
                <LuCaseSensitive className="text-xl" />
                <span className='text-xs'>{words}</span>
              </Button>
            )
          }

          <Button
            className='items-center gap-1'
            variant={"ghost"}
          >
            <LuEye />
            <span className='text-xs'>{viewed}</span>
          </Button>

          <Button
            variant={"ghost"}
            className='group items-center gap-1'
          >
            <LuHeart className="group-hover:text-rose-300 transition-colors" />
            <span className='text-xs'>{favorites}</span>
          </Button>
        </motion.div>

        {/* Categories */}
        <div className='flex justify-center items-center gap-3 flex-wrap max-w-[96%]'>
          {
            categories.map((item, index) => {
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
            author && (
              <motion.div
                className='text-sm text-secondary-foreground flex items-center gap-1'
                variants={slideWithoutScale}
                custom={0.5}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <LuPencil />
                <span>{author}</span>
              </motion.div>
            )
          }

          {
            artist && (
              <motion.div
                className='text-sm text-secondary-foreground flex items-center gap-1'
                variants={slideWithoutScale}
                custom={0.6}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <LuPaintbrush />
                <span>{artist}</span>
              </motion.div>
            )
          }

          {
            studio && (
              <motion.div
                className='text-sm text-secondary-foreground flex items-center gap-1'
                variants={slideWithoutScale}
                custom={0.6}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <LuVideo />
                <span>{studio}</span>
              </motion.div>
            )
          }
        </div>
      </div>

      <Image
        src={image ? image : "/images/default-content-image.jpeg"}
        alt={name}
        fill
        sizes='100%'
        priority
        className='object-cover -z-10'
      />
    </div>
  )
}

export default ContentDetailHeader