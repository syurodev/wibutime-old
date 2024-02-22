"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { slideWithoutScale } from '@/lib/motion/slide';

const BlockLeak = () => {
  const [isTabFocused, setIsTabFocused] = useState<boolean>(true);

  useEffect(() => {
    const handleFocus = () => {
      setIsTabFocused(true);
    };

    const handleBlur = () => {
      setIsTabFocused(false);
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 's' && event.shiftKey && event.metaKey) {
        console.log('Người dùng đã nhấn Windows + Shift + S');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    isTabFocused ? (
      <></>
    ) : (
      <div className='fixed top-0 bottom-0 left-0 right-0 w-screen h-dvh bg-background z-[100] flex items-center justify-center'>

        <motion.span
          variants={slideWithoutScale}
          initial="initial"
          animate="animate"
          exit="exit"
          className='text-xl font-semibold'>O</motion.span>
        <motion.span
          variants={slideWithoutScale}
          custom={0.1}
          initial="initial"
          animate="animate"
          exit="exit"
          className='text-xl font-semibold'>w</motion.span>
        <motion.span
          variants={slideWithoutScale}
          initial="initial"
          animate="animate"
          exit="exit"
          className='text-xl font-semibold'>O</motion.span>
      </div>
    )
  )
}

export default BlockLeak