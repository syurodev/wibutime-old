type AnimeQuickInformation = {
  id: string,
  name: string,
  image: {
    key?: string
    url: string
  } | null,
  createdAt: string,
  user: {
    id: string
  },
  seasons: {
    id: string,
    name: string,
    image?: {
      key?: string
      url: string
    } | null,
    episodes?: {
      id: string
      viewed: number
    }[]
  }[]
}

type AnimeNew = {
  id: string,
  name: string,
  type: ContentType,
  categories: {
    id: string,
    name: string,
  }[],
  summary: any,
  image: {
    key?: string,
    url: string
  } | null,
  seasons: {
    id: string,
    name: string,
    episodes: {
      id: string,
      index: string,
    } | null,
  } | null,
  favorites: string,
}