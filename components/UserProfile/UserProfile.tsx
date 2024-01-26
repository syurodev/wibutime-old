"use client"

import React, { FC } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserInfo from './_component/Info'
import Uploaded from './_component/Uploaded'
import { getAllUserImage } from '@/lib/getAllUserImage'
import { slide, slideWithoutScale } from '@/lib/motion/slide'
import { getUserDetail } from '@/actions/user'

type IProps = {
  id: string
}

const UserProfile: FC<IProps> = ({ id }) => {
  const { data, error } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => getUserDetail(id)
  })

  if (error) notFound()
  if (!data?.data) notFound()

  const allImage = getAllUserImage(data?.data)

  return (
    <div className='flex flex-col gap-5'>

      <motion.div
        className='w-full relative max-h-[35vh] aspect-[21/9] flex rounded-lg overflow-hidden z-0 shadow-xl'
        variants={slide}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {
          allImage.map((image, index) => (
            <motion.div
              key={`user-profile-image-${index}`}
              className="relative w-full h-full overflow-hidden"
              variants={slide}
              custom={0.1 + (index * 0.05)}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Image
                src={image}
                alt={`user-profile-image-${index}`}
                fill
                priority
                sizes='full'
                className='object-cover'
              />
            </motion.div>
          ))
        }
      </motion.div>

      <div className='w-full -mt-16 flex flex-col items-center z-10'>
        <motion.div
          className='relative mb-2'
          variants={slideWithoutScale}
          custom={0.4}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Avatar
            className='size-28 z-10 shadow-lg'
          >
            <AvatarImage
              src={data.data.image || "/images/default-avatar.webp"}
              alt={data.data.name}
              className='object-cover'
            />
            <AvatarFallback className='select-none'>{data.data.name}</AvatarFallback>
          </Avatar>
          <div
            className='absolute size-[120px] bg-background -top-[4px] -left-[4px] rounded-full -z-10'
          ></div>
        </motion.div>

        <motion.p
          className='text-center font-semibold text-2xl lg:text-3xl'
          variants={slideWithoutScale}
          custom={0.5}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {data.data.name}
        </motion.p>

        {data.data.username && <motion.p
          className='text-center text-xs text-secondary-foreground'
          variants={slideWithoutScale}
          custom={0.55}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          @{data.data.username}
        </motion.p>}
      </div>

      <div className='grid grid-cols-1 gap-7 lg:grid-cols-[1fr_3fr]'>
        <UserInfo
          description={data.data.description}
          animes={data.data.animes.length}
          mangas={data.data.mangas.length}
          lightnovels={data.data.lightnovels.length}
        />

        <Uploaded id={id} />
      </div>
    </div>
  )
}

export default UserProfile