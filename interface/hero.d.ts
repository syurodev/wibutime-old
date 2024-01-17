type NewsData = {
  _id: string,
  title: string,
  categories: string[],
  image?: {
    key: string
    url: string
  } | null,
  type: "anime" | "manga" | "lightnovel",
  ep: string,
  duration: number,
  description: string
}

type TrendingData = {
  anime: {
    _id: string;
    title: string;
    view: number;
    like: number;
    image?: {
      key: string
      url: string
    } | null,
  }[];
  manga: {
    _id: string;
    title: string;
    view: number;
    like: number;
    image?: {
      key: string
      url: string
    } | null,
  }[];
  lightnovel: {
    _id: string;
    title: string;
    view: number;
    like: number;
    image?: {
      key: string
      url: string
    } | null,
  }[];
}