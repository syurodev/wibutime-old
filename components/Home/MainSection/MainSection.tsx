import React from 'react'
import Continue from './Continue/Continue'

const data = {
  continue: [
    {
      _id: "9083120",
      image: "https://i2.docln.net/ln/series/covers/s11586-a810d8f0-3973-41fb-ae79-63c968a7a12e.jpg",
      current: 100,
      history: 54,
      type: "lightnovel"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s9193-28267b79-2581-420f-be87-d3cb0ea0f46d-m.jpg",
      current: 129,
      history: 100,
      type: "lightnovel"
    },
    {
      _id: "9083120",
      image: "https://photos.animetvn.com/upload/film/134703.jpg",
      current: 24,
      history: 10,
      type: "anime"
    },
    {
      _id: "9083120",
      image: "https://i.truyenvua.com/ebook/190x247/boku-no-hero-academia_1552459650.jpg?gt=hdfgdfg&mobile=2",
      current: 324,
      history: 300,
      type: "manga"
    },
    {
      _id: "9083120",
      image: "https://photos.animetvn.com/upload/film/140235.jpg",
      current: 12,
      history: 3,
      type: "anime"
    },
    {
      _id: "9083120",
      image: "https://photos.animetvn.com/upload/film/856443.jpg",
      current: 2,
      history: 1,
      type: "anime"
    },
    {
      _id: "9083120",
      image: "https://i.truyenvua.com/ebook/190x247/dao-hai-tac_1552224567.jpg?gt=hdfgdfg&mobile=2",
      current: 110,
      history: 34,
      type: "manga"
    },
  ] as ContinueData[]
}

const MainSection = async () => {
  return (
    <>
      <Continue data={data.continue} />
    </>
  )
}

export default MainSection