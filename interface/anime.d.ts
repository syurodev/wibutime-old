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
  episodes: {
    viewed: number
  }[]
}