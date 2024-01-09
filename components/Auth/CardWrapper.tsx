import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import Lottie from 'lottie-react'

import logoAnimation from '@/lib/logoAnimation.json'

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
  return (
    <div>
      <Card>
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
    </div>
  )
}

export default CardWrapper