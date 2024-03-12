"use client"
import React, { FC, memo, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Input } from '@/components/ui/input'

import CardItem from '@/components/shared/Card/CardItem'
import SlideWithoutScale from '@/components/shared/Motion/SlideWithoutScale'
import { slideWithoutScale } from '@/lib/motion/slide'
import MultiSelect from '@/components/ui/select-multi'
import { getAllCategories } from '@/actions/categories'

type IProps = {
  type: ContentType,
  animes?: AnimeNewItem[],
  mangas?: MangaNewItem[],
  lightnovels?: LightnovelNewItem[],
}

const FullSearchContents: FC<IProps> = ({
  type,
  animes,
  mangas,
  lightnovels,
}) => {
  const [data, setData] = useState<
    AnimeNewItem[] | MangaNewItem[] | LightnovelNewItem[]
  >(animes || mangas || lightnovels || [])
  const [rawData, setRawData] = useState<
    AnimeNewItem[] | MangaNewItem[] | LightnovelNewItem[]
  >(animes || mangas || lightnovels || [])
  const [slug, setSlug] = useState<string>("")
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesSelected, setCategoriesSelected] = useState<Category[]>([])

  useEffect(() => {
    const fetchCate = async () => {
      const data = await getAllCategories()

      if (data.code === 200) {
        setCategories(data.data!)
      }
    }

    fetchCate()
  }, [])

  useEffect(() => {
    const fetchNewData = async () => {
      if (categoriesSelected.length > 0) {
        const res = await fetch(
          `/api/as/news?limit=${12}&page=${0}&categories=${JSON.stringify(categoriesSelected.map(category => (category.id)))}`,
          {
            method: "GET",
            next: { revalidate: 120 },
          }
        )

        if (!res.ok) return

        const data: {
          status: "success" | "error",
          data: AnimeNew | null
        } = await res.json()

        console.log(data)

        if (data.status === "error" || !data.data) return

        setRawData(data.data.animes)
        setData(data.data.animes)
      } else {
        switch (type) {
          case "anime":
            setData(animes ?? [])
            setRawData(animes ?? [])
            break;
          case "lightnovel":
            setData(lightnovels ?? [])
            setRawData(lightnovels ?? [])
            break;
          case "manga":
            setData(mangas ?? [])
            setRawData(mangas ?? [])
            break;
          default:
            break;
        }
      }
    }
    fetchNewData()
  }, [animes, categoriesSelected, lightnovels, mangas, type])

  useEffect(() => {
    // if (data.length === 0) return

    if (type === 'anime') {
      if (!animes) return

      if (slug === "" || slug.trim() === "") {
        setData(rawData ?? [])
      } else {
        const newItems: AnimeNewItem[] = rawData.filter(item => item.name.toLocaleLowerCase().includes(slug.toLocaleLowerCase())) as AnimeNewItem[]

        setData(newItems)
      }
    } else if (type === 'lightnovel') {
      if (!lightnovels) return

      if (slug === "" || slug.trim() === "") {
        setData(lightnovels ?? [])
      } else {
        const newItems = lightnovels.filter(item => item.name.toLocaleLowerCase().includes(slug.toLocaleLowerCase()))

        setData(newItems)
      }
    } else if (type === 'manga') {
      if (!mangas) return

      if (slug === "" || slug.trim() === "") {
        setData(mangas ?? [])
      } else {
        const newItems = mangas.filter(item => item.name.toLocaleLowerCase().includes(slug.toLocaleLowerCase()))

        setData(newItems)
      }
    }
  }, [animes, data.length, lightnovels, mangas, rawData, slug, type])

  return (
    <div className='flex flex-col gap-3'>
      <SlideWithoutScale
        className='max-w-lg w-full mx-auto sticky top-0'
      >
        <Input
          type='text'
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className='shadow'
          placeholder={`Nhập tên ${type} muốn tìm`}
        />
      </SlideWithoutScale>

      <MultiSelect
        data={categories}
        content={categoriesSelected}
        onChange={setCategoriesSelected}
        placeholder='Lọc theo thể loại'
      />

      <motion.h3
        variants={slideWithoutScale}
        custom={0.1}
        initial="initial"
        animate="animate"
        exit="exit"
        className='capitalize'
      >
        {type} News
      </motion.h3>

      <AnimatePresence mode='wait'>
        {
          data.length === 0 ? (
            <motion.p
              variants={slideWithoutScale}
              custom={0.2}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              Không có nội dung
            </motion.p>
          ) : (
            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
              {
                data.map((content, index) => (
                  <SlideWithoutScale
                    key={content.id}
                    delay={0.2 + (index * 0.05)}
                  >
                    <CardItem
                      key={content.id}
                      id={content.id}
                      image={content.image}
                      name={content.name}
                      type={content.type}
                    />
                  </SlideWithoutScale>
                ))
              }
            </div>
          )
        }
      </AnimatePresence>
    </div>
  )
}

export default memo(FullSearchContents)