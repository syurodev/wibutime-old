type LightnovelQuickInformation = {
  id: string,
  name: string,
  image?: {
    key: string,
    url: string,
  } | {} | null,
  createdAt: Date,
  user: {
    id: string,
  },
  volumes: LightnovelVolumeDetail[]
}

type LightnovelDetail = {
  id: string,
  name: string,
  otherNames: string[],
  type: "lightnovel"
  favorites: any[]
  categories: {
    id: string,
    name: string,
  }[],
  createdAt: string,
  updateAt: string,
  summary: string,
  volumes: LightnovelVolumeDetail[],
  author?: string | null,
  artist?: string | null,
  user: {
    id: string;
    image: string | null;
    name: string;
  }
}

type LightnovelVolumeDetail = {
  id: string,
  name: string,
  createdAt: string,
  updateAt: string,
  image?: {
    key?: string,
    url: string,
  } | null,
  chapters: LightnovelChapterInfo[]
}

type LightnovelChapterInfo = {
  id: string,
  name: string,
  content: any,
  createdAt: string,
  viewed: number
}