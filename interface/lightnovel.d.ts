type LightnovelQuickInformation = {
  id: string,
  name: string,
  image?: {
    key: string,
    url: string,
  } | null,
  createdAt: string,
  user: {
    id: string,
  },
  volumes: LightnovelVolumeQuickInformation[]
}

type LightnovelVolumeQuickInformation = {
  id: string,
  name: string,
  createdAt: string,
  updateAt?: string,
  image?: {
    key?: string,
    url: string,
  } | null,
  chapters: LightnovelChapterQuickInformation[]
}

type LightnovelChapterQuickInformation = {
  id: string,
  viewed: number,
  words: number
}

type LightnovelChapterInfo = {
  id: string,
  name: string,
  charge: boolean,
  createdAt: string,
  viewed: number
}

type LightnovelDetail = {
  id: string,
  name: string,
  otherNames: string[],
  type: "lightnovel"
  favorited: boolean,
  favorites: any[]
  categories: {
    id: string,
    name: string,
  }[],
  words: string,
  viewed: string,
  createdAt: string,
  updateAt: string,
  image?: {
    key?: string,
    url: string
  } | null
  summary: any,
  note?: any,
  volumes: LightnovelVolumeDetail[],
  author?: string | null,
  artist?: string | null,
  user: {
    id: string,
    image: string | null,
    name: string,
  },
  translationGroup?: {
    id: string,
    image: {
      key?: string,
      url: string
    } | null,
    name: string,
  }
}

type LightnovelVolumeDetail = {
  id: string,
  name: string,
  createdAt: string,
  updateAt?: string,
  image?: {
    key?: string,
    url: string,
  } | null,
  chapters: LightnovelChapterInfo[]
}

type LightnovelChapterDetail = {
  id: string,
  name: string,
  novelId: string,
  novelName: string,
  authorId: string,
  content: any,
  createdAt: string,
  charge: boolean,
  volumes: {
    id: string,
    image: {
      key: string,
      url: string
    },
    name: string,
    chapters: {
      id: string,
      name: string,
      charge: boolean,
    }[]
  }[],
  updateAt: string,
  viewed: string,
  words: string,
  comments: number,
}

type LightnovelNewItem = {
  id: string,
  name: string,
  type: ContentType,
  user: {
    id: string,
  },
  summary: any,
  categories: {
    id: string,
    name: string,
  }[],
  image: {
    key?: string,
    url: string,
  } | null,
  volumes: {
    id: string,
    name: string,
    end?: number,
    chapters: {
      id: string,
      name: string,
      words: string,
    } | null,
  } | null,
  favorites: string,
}

type LightnovelNew = {
  lightnovels: LightnovelNewItem[],
  totalPage: number
}