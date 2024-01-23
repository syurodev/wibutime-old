type MangaQuickInformation = {
  id: string,
  name: string,
  image?: {
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
    image: {
      key?: string
      url: string
    } | null,
    chapters: {
      id: string
      viewed: number
    }[],
  }[]
}