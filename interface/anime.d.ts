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

type AnimeNewItem = {
  id: string,
  name: string,
  user: {
    id: string
  }
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
    end: number,
    episodes: {
      id: string,
      index: string,
    }[] | null,
  } | null,
  favorites: string,
}

type AnimeNew = {
  animes: AnimeNewItem[],
  totalPage: number
}

type AnimeDetail = {
  id: string,
  name: string,
  otherNames: string[],
  type: "anime",
  favorited: boolean,
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

type SeasonDetail = {
  id: string;
  name: string;
  image?: {
    key: string,
    url: string
  },
  aired: string,
  broadcastDay: string,
  broadcastTime: Date,
  musics?: {
    type: MusicType,
    name: string,
    url?: string,
  }[],
  studio: string,
  numberOfEpisodes: number | null,
  episode: {
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    deleted: boolean | null;
    content: {
      url: string
    };
    viewed: number | null;
    viewed_at: Date | null;
    thumbnail?: {
      url: string
    };
    index: string;
    seasonId: string;
  }[];
  anime: {
    id: string,
    name: string,
    user: {
      id: string,
      name: string,
      image?: string | null,
      followedUsers: {
        followedBy: string
      }[],
    },
    translationGroup?: {
      id: string,
      name: string,
      image?: string,
      followers: {
        followerId: string
      }[],
    } | null,
    favorites: {
      userId: string
    }[]
  }
}