"use client"

import React, { useEffect, useState } from 'react'

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

  console.log(isTabFocused)

  return (
    isTabFocused ? (
      <></>
    ) : (
      <div className='absolute w-screen h-dvh bg-background z-[100]'>

      </div>
    )
  )
}

export default BlockLeak