'use client'

import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'

const fadeInOut: Variants = {
  initial: {
    opacity: 0,
    y: 100,
    width: "100%",
    height: "100%",
    pointerEvents: 'none',
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
  },
  animate: {
    opacity: 1,
    y: 0,
    width: "100%",
    height: "100%",
    pointerEvents: 'all',
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
  },
  exit: {
    opacity: 0,
    y: 100,
    pointerEvents: 'none',
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
  },
}

const transition: HTMLMotionProps<'div'>['transition'] = {
  duration: 0.2,
  staggerChildren: 0.1,
}

const PageFadeInOut: React.FC<
  React.PropsWithChildren<HTMLMotionProps<'div'>>
> = (props) => {

  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      className='w-full'
      variants={fadeInOut}
      transition={transition}
      {...props}
    />
  )
}

export default PageFadeInOut