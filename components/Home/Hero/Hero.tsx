import React from 'react'
import News from './News/News'
import Trending from './Trending/Trending'

const data = {
  news: [
    {
      _id: "eqwe",
      title: "Sokushi Cheat ga Saikyou sugite, Isekai no Yatsura ga Marude Aite ni Naranai n desu ga.",
      categories: ["isekai", "action", "adventure"],
      image: "/images/image1.jpeg",
      type: "anime",
      ep: "ep01",
      duration: 24,
      description: "Growth cheats? Infinite magic power? The ability to utilize all archetypes? What’s the point if instant death ends everything with a single attack?High school senior Yogiri Takatou was on a school field trip when he woke up to a dragon assaulting his sightseeing bus, with the only ones still on the bus being him and his female classmate, the panicking Tomochika Dannoura. Apparently the rest of his classmates had been given special powers by Sion, a woman who introduced herself as Sage, and escaped from the dragon, leaving those that hadn’t received any special powers behind as dragon bait.And so Yogiri was thrown into a parallel universe full of danger, with no idea of what just happened. Likewise, Sion had no way of knowing just what kind of being she had summoned to her world."
    }
  ] as NewsData[],
  trending: {
    anime: [
      {
        _id: "3123123",
        title: "Jujutsu Kaisen 2nd Season",
        view: 421920,
        like: 458,
        image: "https://photos.animetvn.com/upload/film/134703.jpg"
      },
      {
        _id: "3123123",
        title: "Kage no Jitsuryokusha ni Naritakute! 2nd Season",
        view: 392031,
        like: 31458,
        image: "https://photos.animetvn.com/upload/film/138295.jpg"
      },
      {
        _id: "3123123",
        title: "Tokyo Revengers: Tenjiku-hen (Ss3)",
        view: 322031,
        like: 34258,
        image: "https://photos.animetvn.com/upload/film/138322.jpg"
      },
      {
        _id: "3123123",
        title: "Chiyu Mahou no Machigatta Tsukaikata",
        view: 314232,
        like: 3258,
        image: "https://photos.animetvn.com/upload/film/140235.jpg"
      },
      {
        _id: "3123123",
        title: "Hikikomari Kyuuketsuki no Monmon",
        view: 40939,
        like: 283,
        image: "https://photos.animetvn.com/upload/film/137893.jpg"
      },
      {
        _id: "3123123",
        title: "Mato Seihei no Slave",
        view: 1866,
        like: 77,
        image: "https://photos.animetvn.com/upload/film/138908.jpg"
      },
      {
        _id: "3123123",
        title: "Sokushi Cheat ga Saikyou sugite, Isekai no Yatsura ga Marude Aite ni Naranai n desu ga.",
        view: 1055,
        like: 69,
        image: "https://photos.animetvn.com/upload/film/Sokushi-Cheat-ga-Saikyou-sugite-2.jpg"
      },
      {
        _id: "3123123",
        title: "Jaku-Chara Tomozaki-kun 2nd Stage",
        view: 966,
        like: 45,
        image: "https://photos.animetvn.com/upload/film/856443.jpg"
      },
    ],
    manga: [
      {
        _id: "3123123",
        title: "Toàn Chức Pháp Sư",
        view: 50812175,
        like: 16873,
        image: "https://i.truyenvua.com/ebook/190x247/toan-chuc-phap-su_1518956513.jpg?gt=hdfgdfg&mobile=2"
      },
      {
        _id: "3123123",
        title: "My Hero Academia",
        view: 47694686,
        like: 48174,
        image: "https://i.truyenvua.com/ebook/190x247/boku-no-hero-academia_1552459650.jpg?gt=hdfgdfg&mobile=2"
      },
      {
        _id: "3123123",
        title: "One Piece",
        view: 429657797,
        like: 189442,
        image: "https://i.truyenvua.com/ebook/190x247/dao-hai-tac_1552224567.jpg?gt=hdfgdfg&mobile=2"
      },
      {
        _id: "3123123",
        title: "Jujutsu Kaisen",
        view: 73820679,
        like: 54840,
        image: "https://i.truyenvua.com/ebook/190x247/jujutsu-kaisen_1531626913.jpg?gt=hdfgdfg&mobile=2"
      },
      {
        _id: "3123123",
        title: "Naruto",
        view: 57234842,
        like: 14620,
        image: "https://i.truyenvua.com/ebook/190x247/naruto_1552225598.jpg?gt=hdfgdfg&mobile=2"
      },
      {
        _id: "3123123",
        title: "Dragon Ball",
        view: 23592452,
        like: 6618,
        image: "https://i.truyenvua.com/ebook/190x247/7-vien-ngoc-rong_1552225535.jpg?gt=hdfgdfg&mobile=2"
      },
      {
        _id: "3123123",
        title: "Thể Thao Cực Hạn",
        view: 15138433,
        like: 14160,
        image: "https://i.truyenvua.com/ebook/190x247/wind-breaker_1478496463.jpg?gt=hdfgdfg&mobile=2"
      },
      {
        _id: "3123123",
        title: "Độc Thoại Của Người Dược Sĩ",
        view: 350017,
        like: 1625,
        image: "https://i.truyenvua.com/ebook/190x247/doc-thoai-cua-nguoi-duoc-si_1697264725.jpg?gt=hdfgdfg&mobile=2"
      },
    ],
    lightnovel: [
      {
        _id: "3123123",
        title: "Shimotsuki wa Mob ga Suki",
        view: 10954257,
        like: 9615,
        image: "https://i2.docln.net/ln/series/covers/s11586-a810d8f0-3973-41fb-ae79-63c968a7a12e.jpg"
      },
      {
        _id: "3123123",
        title: "Arifureta Shokugyou de Sekai Saikyou",
        view: 8640341,
        like: 8237,
        image: "https://i.docln.net/lightnovel/covers/s767-392eace6-14cc-438f-bc76-90b8351f609c-m.jpg"
      },
      {
        _id: "3123123",
        title: "In no jitsury okusha ni naritakute!",
        view: 6956112,
        like: 11788,
        image: "https://i.docln.net/lightnovel/covers/s3569-4f9d3270-6d42-4301-8ad7-761e917fc3b6-m.jpg"
      },
      {
        _id: "3123123",
        title: "Làm bạn với cô gái đáng yêu thứ hai lớp",
        view: 3252526,
        like: 7665,
        image: "https://i.docln.net/lightnovel/covers/s9193-28267b79-2581-420f-be87-d3cb0ea0f46d-m.jpg"
      },

      {
        _id: "3123123",
        title: "Kết hôn với đứa con gái mà tôi cực ghét trong lớp.",
        view: 2986163,
        like: 9715,
        image: "https://i.docln.net/lightnovel/covers/s8252-088ebf27-72f4-46f3-8d69-149ef698ca08-m.jpg"
      },
      {
        _id: "3123123",
        title: "My Plain-looking Fiancee is Secretly Sweet with me",
        view: 2522787,
        like: 8327,
        image: "https://i.docln.net/lightnovel/covers/s8534-679d8896-1569-4d53-bb4f-df16bfacdeca-m.jpg"
      },
      {
        _id: "3123123",
        title: "Netoge no Yome ga Ninki Idol datta ken ~Cool-kei no kanojo wa genjitsu demo yome no tsumori de iru~",
        view: 1921371,
        like: 8363,
        image: "https://i.docln.net/lightnovel/covers/s9005-b2f2238b-692c-4123-b45a-0d71a785a73e-m.jpg"
      },
      {
        _id: "3123123",
        title: "Hội chứng muốn sống bình an tại dị giới",
        view: 1587666,
        like: 3045,
        image: "https://i.docln.net/lightnovel/covers/s11662-6590b799-1478-47e9-bc97-e031f2c7894d-m.jpg"
      },
    ],
  } as TrendingData
}

const Hero = async () => {
  return (
    <section className='grid grid-cols-[1fr] lg:grid-cols-[3fr_1fr] gap-5'>
      <News data={data.news} />
      <Trending data={data.trending} />
    </section>
  )
}

export default Hero