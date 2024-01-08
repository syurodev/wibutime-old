'use client'

import React, { FC } from 'react'
import { badgeVariants } from "@/components/ui/badge"
import Link from 'next/link';
import { IoEyeOutline } from 'react-icons/io5';
import { GoHeart } from 'react-icons/go';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { slideWithoutScale } from '@/lib/motion';

type IProps = {
  _id: string;
  title: string;
  view: number;
  like: number;
  categories: string[],
  description: string
}

const Info: FC<IProps> = ({
  _id,
  title,
  view,
  like,
  categories,
  description,
}) => {
  return (
    <div className='mt-7 flex flex-col gap-3'>
      <motion.h2
        className='text-center text-pretty font-semibold text-xl'
        variants={slideWithoutScale}
        custom={0.35}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {title}
      </motion.h2>

      <motion.div
        className='flex gap-4 justify-center'
        variants={slideWithoutScale}
        custom={0.4}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className='flex items-center gap-1'>
          <IoEyeOutline />
          <span className='text-xs'>{view}</span>
        </div>
        <Button
          variant={"ghost"}
          className='group items-center gap-1'
        >
          <GoHeart className="group-hover:text-rose-300 transition-colors" />
          <span className='text-xs'>{like}</span>
        </Button>
      </motion.div>

      <div className='flex justify-center gap-3 flex-wrap'>
        {
          categories.map((item, index) => {
            return (
              <motion.div
                key={`category-${index}`}
                variants={slideWithoutScale}
                custom={0.45 + (index * 0.1)}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Link
                  href={"#"}
                  className={badgeVariants({ variant: "outline" })}
                >
                  {item}
                </Link>
              </motion.div>
            )
          })
        }
      </div>
      <motion.p
        className='text-xs text-pretty'
        variants={slideWithoutScale}
        custom={0.6}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {description}
      </motion.p>
    </div>
  )
}

export default Info