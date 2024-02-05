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
  createdAt: string,
  emailVerified: boolean | null,
  description?: any,
  animes: AnimeQuickInformation[],
  mangas: MangaQuickInformation[],
  lightnovels: LightnovelQuickInformation[],
  favorites: FavoriteData
}
