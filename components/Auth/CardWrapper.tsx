import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import Link from 'next/link'
import Lottie from 'lottie-react'

import logoAnimation from '@/lib/logoAnimation.json'
import Image from 'next/image'

type IProps = {
  label: string
  subLabel: string
  bottomLabel: string
  bottomHref: string
  bottomHrefLabel: string
  children: React.ReactNode
}

const CardWrapper: React.FC<IProps> = ({
  label,
  subLabel,
  bottomLabel,
  bottomHrefLabel,
  bottomHref,
  children,
}) => {
  return (
    <div className='flex items-center justify-center h-dvh relative w-screen overflow-hidden'>
      <div className='flex flex-col w-full h-full min-w-[450px] lg:max-w-[37%] justify-center items-center'>
        <div className='absolute top-5 left-5 flex justify-center w-fit'>
          <Link
            href={"/"}
            className='relative flex items-center justify-start pl-10'
            scroll
          >
            <Lottie animationData={logoAnimation} loop={false} className='absolute size-52 -left-[95px] -top-[95px]' />
            <span className='font-semibold'>Wibutime</span>
          </Link>
        </div>

        <Card className='max-w-[550px] lg:max-w-full overflow-hidden z-50 !border-none !border-transparent !shadow-none'>
          <CardHeader className='relative z-0 min-w-[400px] text-5xl font-medium font-serif py-0'>
            {label}
          </CardHeader>
          <CardDescription className='px-6'>{subLabel}</CardDescription>
          <CardContent className='relative z-10 mt-10'>
            {children}
          </CardContent>
          <CardFooter className='flex justify-center'>
            <p className='text-center text-xs'>
              {bottomLabel}
              <Link
                href={bottomHref}
                className='text-anime'
              >
                {` ${bottomHrefLabel}`}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className='relative w-full h-dvh hidden lg:block'>
        <Image
          src="/images/auth.webp"
          alt='wibutime login'
          fill
          sizes='full'
          priority
          className='object-cover hidden lg:block right-0'
        />
      </div>
    </div>
  )
}

export default CardWrapper