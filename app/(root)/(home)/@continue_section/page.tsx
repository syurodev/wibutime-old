import React, { Suspense } from 'react'

import ContinueComponent from '@/components/Home/MainSection/Continue/ContinueComponent'
import ContinueLoading from './loading'

const data = {
  continue: [
    {
      id: "9083120",
      image: {
        key: "",
        url: "https://i2.docln.net/ln/series/covers/s11586-a810d8f0-3973-41fb-ae79-63c968a7a12e.jpg"
      },
      current: 100,
      history: 54,
      type: "lightnovel"
    },
    {
      id: "9083120",
      image: {
        url: "https://i.docln.net/lightnovel/covers/s9193-28267b79-2581-420f-be87-d3cb0ea0f46d-m.jpg"
      },
      current: 129,
      history: 100,
      type: "lightnovel"
    },
    {
      id: "9083120",
      image: {
        url: "https://photos.animetvn.com/upload/film/134703.jpg"
      },
      current: 24,
      history: 10,
      type: "anime"
    },
    {
      id: "9083120",
      image: {
        url: "https://i.truyenvua.com/ebook/190x247/boku-no-hero-academia_1552459650.jpg?gt=hdfgdfg&mobile=2"
      },
      current: 324,
      history: 300,
      type: "manga"
    },
    {
      id: "9083120",
      image: {
        url: "https://photos.animetvn.com/upload/film/140235.jpg"
      },
      current: 12,
      history: 3,
      type: "anime"
    },
  ] as ContinueData[],
  animenews: [
    {
      id: "9083120",
      image: {
        url: "https://i2.docln.net/ln/series/covers/s11586-a810d8f0-3973-41fb-ae79-63c968a7a12e.jpg"
      },
      current: 20,
      end: 24,
      type: "anime",
      name: "Shimotsuki wa Mob ga Suki"
    },
    {
      id: "9083120",
      image: {
        url: "https://i.docln.net/lightnovel/covers/s14960-0abb223a-9b6a-439f-b83e-27780eab896e-m.jpg"
      },
      current: 20,
      end: 24,
      type: "anime",
      name: "Hangyakusha Toshite Oukoku de Shokei sareta Kakure Saikyou Kishi"
    },
    {
      id: "9083120",
      image: {
        url: "https://i2.docln.net/ln/series/covers/s11586-a810d8f0-3973-41fb-ae79-63c968a7a12e.jpg"
      },
      current: 20,
      end: 24,
      type: "anime",
      name: "Shimotsuki wa Mob ga Suki"
    },
  ] as NewlyData[],
  manganews: [
    {
      id: "9083120",
      image: {
        url: "https://i2.docln.net/ln/series/covers/s11586-a810d8f0-3973-41fb-ae79-63c968a7a12e.jpg"
      },
      current: 20,
      end: 24,
      type: "manga",
      name: "Shimotsuki wa Mob ga Suki"
    },
    {
      id: "9083120",
      image: {
        url: "https://i.docln.net/lightnovel/covers/s14960-0abb223a-9b6a-439f-b83e-27780eab896e-m.jpg"
      },
      current: 20,
      end: 24,
      type: "manga",
      name: "Hangyakusha Toshite Oukoku de Shokei sareta Kakure Saikyou Kishi"
    },
    {
      id: "9083120",
      image: {
        url: "https://i2.docln.net/ln/series/covers/s11586-a810d8f0-3973-41fb-ae79-63c968a7a12e.jpg"
      },
      current: 20,
      end: 24,
      type: "manga",
      name: "Shimotsuki wa Mob ga Suki"
    },
  ] as NewlyData[],
  lightnovelnews: [
    {
      id: "9083120",
      image: {
        url: "https://i2.docln.net/ln/series/covers/s11586-a810d8f0-3973-41fb-ae79-63c968a7a12e.jpg"
      },
      current: 20,
      end: 24,
      type: "lightnovel",
      name: "Shimotsuki wa Mob ga Suki"
    },
    {
      id: "9083120",
      image: {
        url: "https://i.docln.net/lightnovel/covers/s14960-0abb223a-9b6a-439f-b83e-27780eab896e-m.jpg"
      },
      current: 20,
      end: 24,
      type: "lightnovel",
      name: "Hangyakusha Toshite Oukoku de Shokei sareta Kakure Saikyou Kishi"
    },
    {
      id: "9083120",
      image: {
        url: "https://i2.docln.net/ln/series/covers/s11586-a810d8f0-3973-41fb-ae79-63c968a7a12e.jpg"
      },
      current: 20,
      end: 24,
      type: "lightnovel",
      name: "Shimotsuki wa Mob ga Suki"
    },
  ] as NewlyData[],
}

const Continue = () => {
  return (
    <section>
      <h1 className='uppercase font-semibold text-lg mb-1'>Continue</h1>

      <Suspense fallback={<ContinueLoading />}>
        <ContinueComponent data={data.continue} />
      </Suspense>
    </section>
  )
}

export default Continue