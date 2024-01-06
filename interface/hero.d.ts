type NewsData = {
  _id: string,
  title: string,
  categories: string[],
  image: string,
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
    image: string;
  }[];
  manga: {
    _id: string;
    title: string;
    view: number;
    like: number;
    image: string;
  }[];
  lightnovel: {
    _id: string;
    title: string;
    view: number;
    like: number;
    image: string;
  }[];
}