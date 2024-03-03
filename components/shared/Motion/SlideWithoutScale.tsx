"use client"

import React, { FC, ReactNode, memo } from 'react'
import { motion } from 'framer-motion'
import { slideWithoutScale } from '@/lib/motion/slide'
import { cn } from '@/lib/utils'

type IProps = {
  delay?: number,
  className?: string,
  children: ReactNode,
}

const SlideWithoutScale: FC<IProps> = ({ delay, className, children }) => {
  return (
    <motion.div
      variants={slideWithoutScale}
      custom={delay ?? 0}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export default memo(SlideWithoutScale)