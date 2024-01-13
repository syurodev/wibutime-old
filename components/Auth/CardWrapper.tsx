import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import Link from 'next/link'
import Lottie from 'lottie-react'

import logoAnimation from '@/lib/logoAnimation.json'
import Image from 'next/image'

type IProps = {
  bottomLabel: string
  bottomHref: string
  bottomHrefLabel: string
  children: React.ReactNode
}

const CardWrapper: React.FC<IProps> = ({
  bottomLabel,
  bottomHrefLabel,
  bottomHref,
  children,
}) => {
  function randomImages(): number {
    return Math.floor(Math.random() * 3) + 1;
  }

  const imageUrl = `/images/image${randomImages()}.jpeg`

  return (
    <div className='flex items-center justify-center h-fit relative w-full lg:max-w-[80%] md:max-w-[70%] rounded-lg overflow-hidden border shadow'>
      <div className='w-full hidden lg:block'></div>

      <Card className='lg:rounded-none min-w-[400px] max-w-[450px] overflow-hidden z-50 !border-none lg:bg-background/70 backdrop-blur-xl shadow-none'>
        <CardHeader className='text-center text-lg relative space-y-4 z-0'>
          <div className='relative w-full flex justify-center'>
            <Link
              href={"/"}
              className='relative flex items-center justify-start pl-10'
              scroll
            >
              <Lottie animationData={logoAnimation} loop={false} className='absolute size-60 -left-[110px] -top-[111px]' />
              <span className='font-semibold'>Wibutime</span>
            </Link>
          </div>
        </CardHeader>
        {/* <CardDescription>{subLabel}</CardDescription> */}
        <CardContent className='relative z-10'>
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
      <Image
        src={imageUrl}
        alt=''
        fill
        sizes='full'
        priority
        className='object-cover hidden lg:block'
      />
    </div>
  )
}

export default CardWrapper