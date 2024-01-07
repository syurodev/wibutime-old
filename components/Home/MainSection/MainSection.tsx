import React from 'react'
import Continue from './Continue/Continue'
import NewlyUpdated from './NewlyUpdated/NewlyUpdated'

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
  ] as ContinueData[],
  animenews: [
    {
      _id: "9083120",
      image: "https://i2.docln.net/ln/series/covers/s11586-a810d8f0-3973-41fb-ae79-63c968a7a12e.jpg",
      current: 20,
      end: 24,
      type: "anime",
      title: "Shimotsuki wa Mob ga Suki"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s14960-0abb223a-9b6a-439f-b83e-27780eab896e-m.jpg",
      current: 20,
      end: 24,
      type: "anime",
      title: "Hangyakusha Toshite Oukoku de Shokei sareta Kakure Saikyou Kishi"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s8101-0465d49c-0546-4199-8f66-76ac7c72277e-m.jpg",
      current: 20,
      end: 24,
      type: "anime",
      title: "Gakusen Toshi Asterisk"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s7832-a04fde71-1435-4c48-8699-3fc5ab282fbe-m.jpg",
      current: 20,
      end: 24,
      type: "anime",
      title: "Seiken Gakuin no Maken Tsukai"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s14341-acdc3012-081d-454d-b78f-57fae111d223-m.jpg",
      current: 20,
      end: 24,
      type: "anime",
      title: "Kẻ Yếu Nhất Học Viện Lại Là Khắc Tinh Của Quỷ"
    }, {
      _id: "9083120",
      image: "https://i2.docln.net/ln/series/covers/s11586-a810d8f0-3973-41fb-ae79-63c968a7a12e.jpg",
      current: 20,
      end: 24,
      type: "anime",
      title: "Shimotsuki wa Mob ga Suki"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s14960-0abb223a-9b6a-439f-b83e-27780eab896e-m.jpg",
      current: 20,
      end: 24,
      type: "anime",
      title: "Hangyakusha Toshite Oukoku de Shokei sareta Kakure Saikyou Kishi"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s8101-0465d49c-0546-4199-8f66-76ac7c72277e-m.jpg",
      current: 20,
      end: 24,
      type: "anime",
      title: "Gakusen Toshi Asterisk"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s7832-a04fde71-1435-4c48-8699-3fc5ab282fbe-m.jpg",
      current: 20,
      end: 24,
      type: "anime",
      title: "Seiken Gakuin no Maken Tsukai"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s14341-acdc3012-081d-454d-b78f-57fae111d223-m.jpg",
      current: 20,
      end: 24,
      type: "anime",
      title: "Kẻ Yếu Nhất Học Viện Lại Là Khắc Tinh Của Quỷ"
    },
  ] as NewlyData[],
  manganews: [
    {
      _id: "9083120",
      image: "https://i2.docln.net/ln/series/covers/s11586-a810d8f0-3973-41fb-ae79-63c968a7a12e.jpg",
      current: 20,
      end: 24,
      type: "manga",
      title: "Shimotsuki wa Mob ga Suki"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s14960-0abb223a-9b6a-439f-b83e-27780eab896e-m.jpg",
      current: 20,
      end: 24,
      type: "manga",
      title: "Hangyakusha Toshite Oukoku de Shokei sareta Kakure Saikyou Kishi"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s8101-0465d49c-0546-4199-8f66-76ac7c72277e-m.jpg",
      current: 20,
      end: 24,
      type: "manga",
      title: "Gakusen Toshi Asterisk"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s7832-a04fde71-1435-4c48-8699-3fc5ab282fbe-m.jpg",
      current: 20,
      end: 24,
      type: "manga",
      title: "Seiken Gakuin no Maken Tsukai"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s14341-acdc3012-081d-454d-b78f-57fae111d223-m.jpg",
      current: 20,
      end: 24,
      type: "manga",
      title: "Kẻ Yếu Nhất Học Viện Lại Là Khắc Tinh Của Quỷ"
    }, {
      _id: "9083120",
      image: "https://i2.docln.net/ln/series/covers/s11586-a810d8f0-3973-41fb-ae79-63c968a7a12e.jpg",
      current: 20,
      end: 24,
      type: "manga",
      title: "Shimotsuki wa Mob ga Suki"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s14960-0abb223a-9b6a-439f-b83e-27780eab896e-m.jpg",
      current: 20,
      end: 24,
      type: "manga",
      title: "Hangyakusha Toshite Oukoku de Shokei sareta Kakure Saikyou Kishi"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s8101-0465d49c-0546-4199-8f66-76ac7c72277e-m.jpg",
      current: 20,
      end: 24,
      type: "manga",
      title: "Gakusen Toshi Asterisk"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s7832-a04fde71-1435-4c48-8699-3fc5ab282fbe-m.jpg",
      current: 20,
      end: 24,
      type: "manga",
      title: "Seiken Gakuin no Maken Tsukai"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s14341-acdc3012-081d-454d-b78f-57fae111d223-m.jpg",
      current: 20,
      end: 24,
      type: "manga",
      title: "Kẻ Yếu Nhất Học Viện Lại Là Khắc Tinh Của Quỷ"
    },
  ] as NewlyData[],
  lightnovelnews: [
    {
      _id: "9083120",
      image: "https://i2.docln.net/ln/series/covers/s11586-a810d8f0-3973-41fb-ae79-63c968a7a12e.jpg",
      current: 20,
      end: 24,
      type: "lightnovel",
      title: "Shimotsuki wa Mob ga Suki"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s14960-0abb223a-9b6a-439f-b83e-27780eab896e-m.jpg",
      current: 20,
      end: 24,
      type: "lightnovel",
      title: "Hangyakusha Toshite Oukoku de Shokei sareta Kakure Saikyou Kishi"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s8101-0465d49c-0546-4199-8f66-76ac7c72277e-m.jpg",
      current: 20,
      end: 24,
      type: "lightnovel",
      title: "Gakusen Toshi Asterisk"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s7832-a04fde71-1435-4c48-8699-3fc5ab282fbe-m.jpg",
      current: 20,
      end: 24,
      type: "lightnovel",
      title: "Seiken Gakuin no Maken Tsukai"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s14341-acdc3012-081d-454d-b78f-57fae111d223-m.jpg",
      current: 20,
      end: 24,
      type: "lightnovel",
      title: "Kẻ Yếu Nhất Học Viện Lại Là Khắc Tinh Của Quỷ"
    }, {
      _id: "9083120",
      image: "https://i2.docln.net/ln/series/covers/s11586-a810d8f0-3973-41fb-ae79-63c968a7a12e.jpg",
      current: 20,
      end: 24,
      type: "lightnovel",
      title: "Shimotsuki wa Mob ga Suki"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s14960-0abb223a-9b6a-439f-b83e-27780eab896e-m.jpg",
      current: 20,
      end: 24,
      type: "lightnovel",
      title: "Hangyakusha Toshite Oukoku de Shokei sareta Kakure Saikyou Kishi"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s8101-0465d49c-0546-4199-8f66-76ac7c72277e-m.jpg",
      current: 20,
      end: 24,
      type: "lightnovel",
      title: "Gakusen Toshi Asterisk"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s7832-a04fde71-1435-4c48-8699-3fc5ab282fbe-m.jpg",
      current: 20,
      end: 24,
      type: "lightnovel",
      title: "Seiken Gakuin no Maken Tsukai"
    },
    {
      _id: "9083120",
      image: "https://i.docln.net/lightnovel/covers/s14341-acdc3012-081d-454d-b78f-57fae111d223-m.jpg",
      current: 20,
      end: 24,
      type: "lightnovel",
      title: "Kẻ Yếu Nhất Học Viện Lại Là Khắc Tinh Của Quỷ"
    },
  ] as NewlyData[],
}

const MainSection = async () => {
  return (
    <>
      <Continue data={data.continue} />
      <NewlyUpdated title='Newly updated anime' data={data.animenews} />
      <NewlyUpdated title='Newly updated manga' data={data.manganews} />
      <NewlyUpdated title='Newly updated lightnovel' data={data.lightnovelnews} />
    </>
  )
}

export default MainSection