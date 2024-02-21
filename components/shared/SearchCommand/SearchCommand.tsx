"use client"

import React, { Dispatch, FC, SetStateAction, useEffect, useState, useTransition } from 'react'
import Image from 'next/image'
import { LuSearch } from "react-icons/lu";
import { motion, AnimatePresence } from 'framer-motion';

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog-custom"
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

import useDebounce from '@/hooks/useDebounce'
import { search } from '@/actions/search'
import { ReloadIcon } from '@radix-ui/react-icons';
import { slideWithoutScale } from '@/lib/motion/slide';
import Link from 'next/link';

type IProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const SearchCommand: FC<IProps> = ({
  open,
  setOpen,
}) => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [searchItems, setSearchItems] = useState<{
    id: string;
    name: string;
    image?: {
      key: string;
      url: string;
    } | null | undefined;
    type: ContentType;
  }[]>([])
  const [isPending, startTransiton] = useTransition()

  let debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    const fetchContent = () => {
      startTransiton(async () => {
        if (debounced === "" || debounced.trim() === "") {
          setSearchItems([])
          return
        }
        const res = await search(debounced)
        setSearchItems(res)
      })
    }

    fetchContent()
  }, [debounced])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='overflow-hidden'>
        <DialogHeader className='justify-center'>
          <div
            className='flex items-center flex-row px-3 py-1'
          >
            <LuSearch className="text-lg" />
            <Input
              className='!border-none !ring-0 !outline-none'
              type='text'
              spellCheck="false"
              autoFocus
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className='size-4'>
              {isPending && <ReloadIcon className="size-4 animate-spin" />}
            </div>
          </div>
          <Separator />
        </DialogHeader>
        <AnimatePresence mode='wait'>
          <div className='flex flex-col gap-2 relative w-full'>
            {
              searchItems.length === 0 ? (
                <motion.p
                  className='text-center p-3 text-sm text-secondary-foreground select-none'
                  key={"search empty"}
                  variants={slideWithoutScale}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {
                    searchValue === "" || searchValue.trim() === "" ? "Nhập nội dung tìm kiếm." : "Không tìm thấy kết quả."
                  }
                </motion.p>
              ) : (
                searchItems.map((item, index) => (
                  <Link
                    key={`search-item-${item.id}`}
                    className='p-3 relative w-full'
                    href={`/${item.type}s/${item.type}/${item.id}`}
                    onClick={() => setOpen(false)}
                  >
                    <motion.div
                      className='flex items-center gap-3 hover:bg-secondary relative w-full overflow-hidden'
                      variants={slideWithoutScale}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={index * 0.1}
                    >
                      <div className='relative rounded-lg aspect-[2/3] w-[35px] overflow-hidden'>
                        <Image
                          src={item.image?.url ?? "/images/default-content-image.webp"}
                          alt=''
                          fill
                          sizes='full'
                          className='object-cover'
                        />
                      </div>
                      <div className='flex flex-col w-full overflow-hidden'>
                        <p
                          className='text-sm whitespace-nowrap line-clamp-1 font-semibold'
                        >
                          {item.name}
                        </p>

                        <Badge
                          variant={item.type as "lightnovel" | "anime" | "manga" | "default" | "secondary" | "destructive" | "outline" | null | undefined}
                          className='cursor-pointer select-none uppercase w-fit text-xs'
                        >
                          {item.type}
                        </Badge>
                      </div>
                    </motion.div>
                  </Link>
                ))
              )
            }
          </div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

export default SearchCommand