import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatDate } from '@/lib/formatDate'

type IProps = {
  episodes: {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    deleted: boolean | null;
    content: {
      url: string
    };
    viewed: number | null;
    viewed_at: Date | null;
    thumbnail?: {
      url: string
    };
    index: string;
    seasonId: string;
  }[],
  epIndex: string
}

const EpisodeList: FC<IProps> = ({ episodes, epIndex }) => {
  return (
    <Accordion
      type="single"
      className="w-full border px-4 rounded-xl backdrop-blur-md bg-background/30"
      defaultValue="episodes"
      collapsible
    >
      <AccordionItem
        value="episodes"
      >
        <AccordionTrigger className='text-sm font-semibold'>
          Episodes ({episodes.length})
        </AccordionTrigger>
        <ScrollArea className="h-full max-h-[500px] w-full rounded-md">
          {
            episodes.map((ep, index) => (
              <Link
                key={ep.id}
                href={`?ep=${ep.index}`}
                scroll={false}
              >
                <AccordionContent
                  className={`flex items-start gap-3 ${epIndex === ep.index ? "bg-secondary hover:bg-secondary" : ""} ${index === episodes.length - 1 ? "mb-4" : "mb-2"}`}
                >
                  <div className='relative w-24 rounded-lg overflow-hidden aspect-video'>
                    {
                      ep.thumbnail ? (
                        <Image
                          src={ep.thumbnail?.url}
                          alt={ep.index}
                          className='object-cover'
                          fill
                          sizes='full'
                        />
                      ) : (
                        <p>{ep.index}</p>
                      )
                    }
                  </div>

                  <div className='flex flex-col'>
                    <p className='text-sm font-semibold'>{ep.index}</p>
                    <p className='text-xs text-secondary-foreground'>{ep.viewed} lượt xem</p>
                    <p className='text-xs text-secondary-foreground'>{ep.createdAt ? formatDate(ep.createdAt.toISOString()) : ""}</p>
                  </div>
                </AccordionContent>
              </Link>
            ))
          }

        </ScrollArea>
      </AccordionItem>
    </Accordion>
  )
}

export default EpisodeList