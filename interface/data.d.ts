type DetailData = {
  id: string;
  name: string;
  producer: string;
  releaseDate: string;
  author?: string;
  artist?: string;
  view: number;
  favorites: any[];
  categories: string[];
  description: string;
  type: "anime" | "manga" | "lightnovel";
  music: {
    title: string;
    name: string;
    link: string;
  }[];

  duration: number;
  eps?: {
    id: string,
    url: string
  }[];
  volumes: LightnovelVolumeDetail[],
  mangachaps?: {
    id: string,
    image: {
      key?: string
      url: string
    }[]
  }[],
  current?: number;
  end?: number;
  history?: {
    title: string,
    url: string
  };
  image?: {
    key?: string
    url: string
  } | null
  thumbnail?: {
    key?: string
    url: string
  } | null;
  auth: {
    id: string;
    image: {
      key?: string
      url: string
    } | string | null;
    name: string;
  }
}

type Category = {
  id: string,
  name: string
}

type ContentType = "anime" | "manga" | "lightnovel"

type ContentStatus = "Pause" | "Complete" | "InProcess"
