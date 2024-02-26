"use client"

import React, { FC, memo, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';

import CategoryCard from '@/components/shared/Card/CategoryCard';
import SlideWithoutScale from '@/components/shared/Motion/SlideWithoutScale';

type IProps = {
  data: {
    id: string;
    name: string;
    animes: number;
    mangas: number;
    lightnovels: number;
  }[]
}

const CategoriesContent: FC<IProps> = ({ data }) => {
  const params = useSearchParams()

  const [categories, setCategories] = useState<{
    id: string;
    name: string;
    animes: number;
    mangas: number;
    lightnovels: number;
  }[]>(data)

  const [slug, setSlug] = useState<string>(params.get("slug") ?? "")

  useEffect(() => {
    if (slug !== "" || slug.trim() !== "") {
      const newCategories = data.filter(item => item.name.toLowerCase().includes(slug.toLocaleLowerCase()))

      setCategories(newCategories)
    } else {
      setCategories(data)
    }
  }, [data, slug])

  return (
    <>
      <SlideWithoutScale
        className='sticky top-0 w-full max-w-lg mx-auto mb-3'
      >
        <Input
          type='text'
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className='bg-background shadow'
        />
      </SlideWithoutScale>

      <div
        className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full'
      >
        {
          categories.map((item, index) => {
            return (
              <SlideWithoutScale
                key={item.id}
                delay={0.1 + index * 0.05}
              >
                <CategoryCard cate={item} />
              </SlideWithoutScale>
            )
          })
        }
      </div>
    </>
  )
}

export default memo(CategoriesContent)