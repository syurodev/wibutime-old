type LightnovelQuickInformation = {
  id: string,
  name: string,
  image?: {
    key: string
    url: string
  } | {} | null,
  createdAt: Date,
  user: {
    id: string
  },
  volumes: {
    id: string,
    name: string,
    image: {
      key: string
      url: string
    } | {} | null,
    chapters: {
      id: string
      viewed: number
    }[],
  }[]
}