type NewsData = {
  id: string,
  name: string,
  type: ContentType,
  summary: any,
  categories: {
    id: string,
    name: string,
  }[],
  image: {
    key?: string,
    url: string
  } | null,
  volumes?: {
    id: string,
    name: string,
    chapters: {
      id: string,
      name: string,
      words: string,
    } | null,
  } | null,
  seasons?: {
    id: string,
    name: string,
    chapters?: {
      id: string,
      index: string,
    }[] | null,
    episodes?: {
      id: string,
      index: string,
    }[] | null,
  } | null,
  favorites: string,
}[]

type TrendingData = {
  id: string,
  name: string,
  image: {
    key: string,
    url: string,
  },
  numfavorites: string,
  totalviews: string
}