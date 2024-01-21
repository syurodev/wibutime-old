'use client'

import React, { FC } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { slide, slideWithoutScale } from '@/lib/motion'

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
    <motion.div
      className='w-full h-fit overflow-hidden relative rounded-2xl shadow'
      variants={slide}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={0.1}
    >
      <div
        className='w-full h-[60vh] min-h-[500px] overflow-hidden rounded-2xl relative'
      >
        <div className='absolute w-full h-full flex flex-col justify-between overflow-hidden bg-background/60 backdrop-blur-xl z-30 items-center gap-4'>
          <div
            className='relative max-w-[200px] w-[30vw] aspect-[2/3] rounded-lg overflow-hidden'
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
          </div>
          {/* <motion.div
            className='p-3 h-full w-full overflow-hidden rounded-b-2xl'
            variants={slideWithoutScale}
            custom={0.2}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            
          </motion.div> */}
        </div>

        <motion.div
          className='w-full h-full relative flex items-start overflow-hidden rounded-2xl z-10'
          variants={slide}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Image
            src={image ? typeof image === "string" ? image : image.url : "/images/image2.jpeg"}
            alt={`thumbnail - ${name}`}
            fill
            sizes='90vw'
            className='object-cover'
            priority
          />
        </motion.div>
      </div>

    </motion.div>
    // <div className='relative overflow-hidden'>
    //   <motion.div
    //     variants={slide}
    //     custom={0.1}
    //     initial="initial"
    //     animate="animate"
    //     exit="exit"
    //     className='relative w-full h-[45vh] rounded-lg overflow-hidden shadow z-10'
    //   >
    //     <Image
    // src={image ? typeof image === "string" ? image : image.url : "/images/image2.jpeg"}
    // alt={`thumbnail - ${name}`}
    // fill
    // sizes='100%'
    // priority
    //       className='object-cover brightness-70 z-10'
    //     />
    //   </motion.div>

    //   <motion.div
    //     initial={{
    //       y: "50",
    //       opacity: 0,
    //       scale: 1.1
    //     }}
    //     animate={{
    //       y: 0,
    //       opacity: 1,
    //       scale: 1,
    //       transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    //     }}
    //     exit={{
    //       y: "-100",
    //       opacity: 0,
    //       scale: 0.9,
    //       transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    //     }}
    //     // className={`absolute left-1/2 max-w-[200px] -translate-x-1/2 w-[30vw] aspect-[2/3] rounded-lg overflow-hidden z-20 flex justify-center items-end ${type === 'contentImage' ? "shadow -bottom-[5%]" : "-bottom-[10%]"}`}
    //     className='absolute top-0 w-full h-[45vh] z-20 left-0 right-0 bg-background/60'
    //   >
    // <div
    //   className='max-w-[200px] w-[30vw] aspect-[2/3] rounded-lg overflow-hidden'
    // >
    //   {
    //     type === 'contentImage' ? (
    //       <Image
    //         src={image ? typeof image === "string" ? image : image.url : "/images/image2.jpeg"}
    //         alt={`cover image - ${name}`}
    //         fill
    //         sizes='100%'
    //         priority
    //         className='object-cover'
    //       />
    //     ) : (
    //       <Avatar
    //         className='size-32 md:size-40 bg-background/60 backdrop-blur-lg shadow'
    //       >
    //         <AvatarImage
    //           src={image ? typeof image === "string" ? image : image.url : "/images/default-avatar.webp"}
    //           alt={name}

    //         />
    //         <AvatarFallback>{name}</AvatarFallback>
    //       </Avatar>
    //     )
    //   }
    // </div>
    //     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita ipsa amet ullam impedit quis in provident, blanditiis facilis mollitia! Tempora ut eius suscipit voluptates similique architecto esse laborum iure quos?
    //   </motion.div>
    // </div>
  )
}

export default Hero