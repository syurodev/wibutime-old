'use client'

import React, { FC } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { slide } from '@/lib/motion'

type IProps = {
  image: string
  thumbnail: string
}

const Hero: FC<IProps> = ({
  image,
  thumbnail,
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
        {/* <div className='w-full h-full bottom-0 absolute z-10 backdrop-blur-md bg-primary/20 backdrop-hue-rotate-30' /> */}
        <Image src={thumbnail} alt='thumbnail' fill sizes='100%' priority className='object-cover brightness-70' />
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
        className='absolute -bottom-[5%] left-1/2 max-w-[200px] -translate-x-1/2 w-[30vw] aspect-[2/3] rounded-lg overflow-hidden shadow z-20'
      >
        <Image src={image} alt='thumbnail' fill sizes='100%' priority className='object-cover' />
      </motion.div>
    </div>
  )
}

export default Hero