'use client'

import React, { FC } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { slide } from '@/lib/motion'

type IProps = {
  image?: {
    key?: string
    url: string
  } | null | string,
  thumbnail?: {
    key?: string
    url: string
  } | null,
  name: string
  type: "userAvatar" | "contentImage"
}

const Hero: FC<IProps> = ({
  image,
  thumbnail,
  type,
  name
}) => {
  return (
    <div className='relative'>
      <motion.div
        variants={slide}
        custom={0.1}
        initial="initial"
        animate="animate"
        exit="exit"
        className='relative w-full h-[45vh] rounded-lg overflow-hidden shadow'
      >
        <Image
          src={thumbnail ? thumbnail.url : "/images/default-cover-image.jpeg"}
          alt={`thumbnail - ${name}`}
          fill
          sizes='100%'
          priority
          className='object-cover brightness-70'
        />
      </motion.div>

      <motion.div
        initial={{
          y: "50",
          x: "-50%",
          opacity: 0,
          scale: 1.1
        }}
        animate={{
          y: 0,
          x: "-50%",
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
        }}
        exit={{
          y: "-100",
          x: "-50%",
          opacity: 0,
          scale: 0.9,
          transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
        }}
        className={`absolute left-1/2 max-w-[200px] -translate-x-1/2 w-[30vw] aspect-[2/3] rounded-lg overflow-hidden z-20 flex justify-center items-end ${type === 'contentImage' ? "shadow -bottom-[5%]" : "-bottom-[10%]"}`}
      >
        {
          type === 'contentImage' ? (
            <Image
              src={image ? typeof image === "string" ? image : image.url : "/images/image2.jpeg"}
              alt={`cover image - ${name}`}
              fill
              sizes='100%'
              priority
              className='object-cover'
            />
          ) : (
            <Avatar
              className='size-32 md:size-40 bg-background/60 backdrop-blur-lg shadow'
            >
              <AvatarImage
                src={image ? typeof image === "string" ? image : image.url : "/images/default-avatar.webp"}
                alt={name}

              />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
          )
        }
      </motion.div>
    </div>
  )
}

export default Hero