'use client'

import React from 'react'
import Lottie from "lottie-react";

import logoAnimation from '@/lib/logoAnimation.json'

const Loading = () => {
  return (
    <div className='w-full h-[calc(100dvh-150px)] flex items-center justify-center z-[100]'>
      <Lottie animationData={logoAnimation} loop={true} className='size-52' />
    </div>
  )
}

export default Loading