
import { FC } from 'react'
import PageFadeInOut from '@/components/shared/PageAnimatePresence/PageFadeInOut';

import Images from '@/components/Detail/Images'
import Info from '@/components/Detail/Info';

type IProps = {
  params: { id: string };
}

const data = {
  id: "eqwe",
  categories: ["Romance", "School Life", "Comedy"],
  title: "Làm bạn với cô gái đáng yêu thứ hai lớp",
  type: "manga",
  description: 'Một câu chuyện hài lãng mạn ngọt ngào bắt nguồn từ mối quan hệ bạn bè bí mật! Tôi là Maehara Maki, đã không có bạn bè, hay thậm chí là người quen khi bước vào cao trung, cuối cùng bây giờ cũng đã có bạn đi chơi ở ngoài trường. Đó là một cô gái. Cô ấy tên là Asanagi. Đám con trai hay gọi cô ấy là “Cô gái đáng yêu thứ hai trong lớp”. Cứ vào thứ sáu, cô ấy lại từ chối lời mời của bạn thân Amami, và đến nhà tôi chơi. Vừa chơi game, xem phim, đọc manga, vừa uống Coca, ăn Junk Food được ship đến như Hamburger hay Pizza. Đó là khoảng thời gian ăn chơi của tôi và Asanagi-san, nhưng nó cũng là một bí mật rất quan trọng.',
  current: 200,
  end: 0,
  duration: 1492,
  mangachaps: [
    {
      id: "1",
      urls: [
        "https://utfs.io/f/20379337-235a-4c27-9a13-8473c92fb7a7-1c.jpg",
        "https://utfs.io/f/33afdea1-81c9-48d0-a9bb-c822919f5d7f-1d.jpg",
        "https://utfs.io/f/5b8c4540-543d-4436-8b38-3727dccca8c5-1e.jpg",
        "https://utfs.io/f/d774f162-9830-4463-b4f1-296a6392cd59-1f.jpg",
      ]
    },
    {
      id: "2",
      urls: [
        "https://utfs.io/f/c56c51d6-8815-4354-a7d5-ff34e37e3ab6-1pmpj9.jpg",
        "https://utfs.io/f/1fe5cd3b-c6a5-4849-9873-781e4cdea68f-uxlovm.jpg",
        "https://utfs.io/f/e85fd56e-f79e-43ec-88b3-fb9cc1c6cdbc-wrutvv.jpg",
        "https://utfs.io/f/22936f51-cf85-4d16-affb-7d0b31b38bed-nnzuxc.jpg",
      ]
    }
  ],
  producer: "A1 Picture",
  releaseDate: "Q1 2024",
  music: [
    {
      title: "Opening Theme",
      name: "Utopia (ユートピア) by Keina Suda (須田景凪)",
      link: ""
    },
    {
      title: "Ending Theme",
      name: "My Factor by Kento Itou (伊東健人)",
      link: ""
    },
  ],
  history: {
    title: "Vol.1 Chapter 1 Vol.1 Chapter 1 Vol.1 Chapter 1 Vol.1 Chapter 1",
    url: "/"
  },
  image: "https://i.docln.net/lightnovel/covers/s9193-28267b79-2581-420f-be87-d3cb0ea0f46d-m.jpg",
  thumbnail: "https://i.imgur.com/AF4ivQu.jpeg",
  like: 1920,
  view: 312392,
  auth: {
    id: "u283uer8239",
    image: "https://source.unsplash.com/random",
    name: "Jame"
  }
} as DetailData

const MangaPage: FC<IProps> = ({ params }) => {

  return (
    <PageFadeInOut>
      <div>
        <Images
          image={data.image}
          thumbnail={data.thumbnail}
        />
        <Info
          {...data}
        />
      </div>
    </PageFadeInOut>
  )
}

export default MangaPage