type UserRole = "ADMIN" | "USER" | "CREATER"
type UserPermissions = "ALL" | "COMMENT" | "UPLOAD" | "FAVORITE"

type FavoriteData = {
  animes: {
    id: string,
    name: string,
    image?: {
      key: string
      url: string
    } | {} | null,
    user: {
      id: string
    },
  }[],
  lightnovels: {
    id: string,
    name: string,
    image?: {
      key: string
      url: string
    } | {} | null,
    user: {
      id: string
    },
  }[],
  mangas: {
    id: string,
    name: string,
    image?: {
      key: string
      url: string
    } | {} | null,
    user: {
      id: string
    },
  }[],
}

type UserProfile = {
  id: string,
  image?: string | null,
  name: string,
  username?: string | null,
  email: string | null,
  createdAt: Date,
  emailVerified: boolean | null,
  coverImage?: {
    key?: string,
    url: string
  } | {} | null,
  description?: string | null,
  animes: AnimeQuickInformation[],
  mangas: MangaQuickInformation[],
  lightnovels: LightnovelQuickInformation[],
  favorites: FavoriteData[]
}
