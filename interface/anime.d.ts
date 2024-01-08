type AnimeData = {
  _id: string;
  title: string;
  view: number;
  like: number;
  categories: string[],
  description: string

  duration: number,
  ep: string[],
  current: number;
  end: number;
  history: number;

  image: string;
  thumbnail: string;
}