type AnimeQuickInformation = {
  id: string,
  name: string,
  image: {
    key: string
    url: string
  } | {} | null,
  createdAt: Date,
  user: {
    id: string
  },
  seasons: {
    id: string,
    name: string,
    image: {
      key: string
      url: string
    } | {} | null,
    episodes: {
      id: string
      viewed: number
    }[]
  }[]
}