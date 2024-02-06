type AnimeQuickInformation = {
  id: string,
  name: string,
  createdAt: string,
  user: {
    id: string
  },
  image?: {
    key?: string
    url: string
  } | null,
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

type AnimeDetail = {
  id: string,
  name: string,
  otherNames: string[],
  type: "anime"
  favorites: any[]
  categories: {
    id: string,
    name: string,
  }[],
  viewed: string,
  createdAt: string,
  updateAt: string,
  image?: {
    key?: string,
    url: string
  } | null
  summary: any,
  note?: any,
  seasons: AnimeSeasonDetail[],
  user: {
    id: string;
    image: string | null;
    name: string;
  },
  translationGroup?: {
    id: string;
    image: {
      key?: string,
      url: string
    } | null;
    name: string;
  }
}

type AnimeSeasonDetail = {
  id: string,
  name: string,
  createdAt: string,
  updateAt?: string,
  image?: {
    key?: string,
    url: string,
  } | null,
  studio: string,
  musics?: {
    type: MusicType,
    name: string,
    url?: string
  },
  broadcastTime: string,
  broadcastDay: string,
  aired: string,
  numberOfEpisodes: number,
  episodes: AnimeEpisodeInfo[]
}



type AnimeEpisodeInfo = {
  id: string;
  index: string;
  content: {
    key: string,
    url: string
  };
  createdAt: string;
  viewed: string;
  thumbnail?: {
    key?: string,
    url: string,
  } | null,
  createdAt: string
}
