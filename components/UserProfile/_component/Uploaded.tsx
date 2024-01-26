"use client"

import React, { FC } from 'react'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CardItem from '@/components/shared/Card/CardItem'
import { getUserDetail } from '@/actions/user'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { slideWithoutScale } from '@/lib/motion/slide'

type IProps = {
  id: string
}

const Uploaded: FC<IProps> = ({ id }) => {
  const { data, error } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => getUserDetail(id)
  })

  if (error) notFound()
  if (!data?.data) notFound()

  const session = useCurrentUser()

  return (
    <Tabs defaultValue="animes" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="animes">Animes</TabsTrigger>
        <TabsTrigger value="mangas">Mangas</TabsTrigger>
        <TabsTrigger value="lightnovels">Lightnovels</TabsTrigger>
      </TabsList>
      <TabsContent value="animes" className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {
          data.data.animes && data.data.animes.length > 0 ? (
            data.data.animes.map((item, index) => {
              return (
                <motion.div
                  key={`anime - ${item.name}`}
                  variants={slideWithoutScale}
                  custom={0.3 + (index * 0.07)}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <CardItem
                    {...item}
                    image={item.image as {
                      key?: string;
                      url: string;
                    } | null | undefined
                    }
                    type='anime'
                    poster={session && item.user.id === session.id || false}
                  />
                </motion.div>
              )
            })
          ) : (
            <p>Không có anime</p>
          )
        }
      </TabsContent>
      <TabsContent value="mangas" className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {
          data.data.mangas && data.data.mangas.length > 0 ? (
            data.data.mangas.map((item, index) => {
              return (
                <motion.div
                  key={`manga - ${item.name}`}
                  variants={slideWithoutScale}
                  custom={0.2 + (index * 0.07)}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <CardItem
                    key={`lightnovel - ${item.name}`}
                    {...item}
                    image={item.image as {
                      key?: string;
                      url: string;
                    } | null | undefined
                    }
                    type='manga'
                    poster={session && item.user.id === session.id || false}
                  />
                </motion.div>
              )
            })
          ) : (
            <p>Không có manga</p>
          )
        }
      </TabsContent>
      <TabsContent value="lightnovels" className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {
          data.data.lightnovels && data.data.lightnovels.length > 0 ? (
            data.data.lightnovels.map((item, index) => {
              return (
                <motion.div
                  key={`lightnovel - ${item.name}`}
                  variants={slideWithoutScale}
                  custom={0.2 + (index * 0.07)}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <CardItem
                    key={`lightnovel - ${item.name}`}
                    {...item}
                    image={item.image as {
                      key?: string;
                      url: string;
                    } | null | undefined
                    }
                    type='lightnovel'
                    poster={session && item.user.id === session.id || false}
                  />
                </motion.div>
              )
            })
          ) : (
            <p>Không có lightnovel</p>
          )
        }
      </TabsContent>
    </Tabs>
  )
}

export default Uploaded