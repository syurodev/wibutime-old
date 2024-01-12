
import { FC } from 'react'
import PageFadeInOut from '@/components/shared/PageAnimatePresence/PageFadeInOut';

import Images from '@/components/Detail/Images'
import Info from '@/components/Detail/Info';

type IProps = {
  params: { id: string };
}

const data = {
  _id: "eqwe",
  categories: ["Romance", "School Life", "Comedy"],
  title: "Làm bạn với cô gái đáng yêu thứ hai lớp",
  type: "anime",
  description: 'Một câu chuyện hài lãng mạn ngọt ngào bắt nguồn từ mối quan hệ bạn bè bí mật! Tôi là Maehara Maki, đã không có bạn bè, hay thậm chí là người quen khi bước vào cao trung, cuối cùng bây giờ cũng đã có bạn đi chơi ở ngoài trường. Đó là một cô gái. Cô ấy tên là Asanagi. Đám con trai hay gọi cô ấy là “Cô gái đáng yêu thứ hai trong lớp”. Cứ vào thứ sáu, cô ấy lại từ chối lời mời của bạn thân Amami, và đến nhà tôi chơi. Vừa chơi game, xem phim, đọc manga, vừa uống Coca, ăn Junk Food được ship đến như Hamburger hay Pizza. Đó là khoảng thời gian ăn chơi của tôi và Asanagi-san, nhưng nó cũng là một bí mật rất quan trọng.',
  current: 200,
  end: 0,
  duration: 1492,
  eps: [
    {
      id: "1",
      url: "https://utfs.io/f/9fa5b715-c48e-4c41-9042-b727ec6ff493-6mesev.mp4"
    },
    {
      id: "2",
      url: "https://utfs.io/f/9fa5b715-c48e-4c41-9042-b727ec6ff493-6mesev.mp4"
    },
    {
      id: "3",
      url: "https://utfs.io/f/9fa5b715-c48e-4c41-9042-b727ec6ff493-6mesev.mp4"
    },
  ],
  chaps: [
    {
      title: "WN Vol.1: Cô gái đáng yêu thứ hai lớp (ĐÃ HOÀN THÀNH)",
      image: "https://i.docln.net/lightnovel/covers/b14036-4171e987-219e-4140-a25b-abd4c81ae2f4-m.jpg",
      eps: [
        {
          title: "Cô gái đáng yêu thứ hai trong lớp",
          url: "/",
          date: "31/05/2021"
        },
        {
          title: "Khởi đầu của cuộc gặp gỡ (1)",
          url: "/",
          date: "31/05/2021"
        },
        {
          title: "Khởi đầu của cuộc gặp gỡ (2)",
          url: "/",
          date: "01/06/2021"
        },
      ]
    },
    {
      title: "WN Vol.2: Giáng sinh (ĐÃ HOÀN THÀNH)",
      image: "https://i.docln.net/lightnovel/covers/b19083-6f1ef772-22fd-4258-87d3-b1a8358b77d6-m.jpg",
      eps: [
        {
          title: "Một khởi đầu mới",
          url: "/",
          date: "31/05/2021"
        },
        {
          title: "Lời mời",
          url: "/",
          date: "31/05/2021"
        },
        {
          title: "Cuộc nói chuyện ngượng ngùng",
          url: "/",
          date: "01/06/2021"
        },
      ]
    },
    {
      title: "WN Vol.3: Amami Yuu (ĐÃ HOÀN THÀNH)",
      image: "https://i.docln.net/lightnovel/covers/b19997-496c6e25-322d-4ae0-82b4-9fc443110a76-m.jpg",
      eps: [
        {
          title: "Bước ngoặt",
          url: "/",
          date: "31/05/2021"
        },
        {
          title: "Ngày cuối đến trường",
          url: "/",
          date: "31/05/2021"
        },
        {
          title: "Nghỉ xuân cùng cô ấy",
          url: "/",
          date: "01/06/2021"
        },
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

const AnimePage: FC<IProps> = ({ params }) => {

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

export default AnimePage