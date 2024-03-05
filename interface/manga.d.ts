type MangaQuickInformation = {
  id: string,
  name: string,
  // image?: {
  //   key?: string
  //   url: string
  // } | null,
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

type MangaNewItem = {
  id: string,
  name: string,
  user: {
    id: string
  },
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
  seasons: {
    id: string,
    name: string,
    end?: number,
    chapters: {
      id: string,
      index: string,
    }[] | null,
  } | null,
  favorites: string,
}

type MangaNew = {
  mangas: MangaNewItem[],
  totalPage: number
}