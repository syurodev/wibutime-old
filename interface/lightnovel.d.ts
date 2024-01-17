type LightnovelQuickInformation = {
  id: string,
  name: string,
  image?: {
    key: string
    url: string
  } | null,
  createdAt: Date,
  user: {
    id: string
  },
  chapters: {
    viewed: number
  }[],
}