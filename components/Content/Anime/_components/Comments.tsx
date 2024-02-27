"use client"

import React, { FC, useState, useEffect } from 'react'
import { LuPlusCircle } from "react-icons/lu"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { getCommentsAnimeEpisode } from '@/actions/anime'
import AddComment from '../../../shared/Comment/AddComment'
import { Button } from '@/components/ui/button'

type IProps = {
  episodeId: string
}

const Comments: FC<IProps> = ({ episodeId }) => {
  const [comments, setComments] = useState<any>([])

  useEffect(() => {
    const fetchComments = async () => {
      const res = await getCommentsAnimeEpisode(episodeId)

      if (res.code === 200) {
        setComments(res.data)
      }
    }

    fetchComments()
  }, [episodeId])

  console.log("comments", comments)

  return (
    <Accordion
      type="single"
      className="w-full border px-4 rounded-xl"
      defaultValue="episodes"
      collapsible
    >
      <AccordionItem
        value="episodes"
      >
        <AccordionTrigger className='text-sm font-semibold'>
          Bình luận
        </AccordionTrigger>

        <AccordionContent
          className="flex flex-col items-start gap-3 mb-2"
        >
          {/* <AddComment /> */}
          comment
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default Comments