type DetailData = {
  id: string;
  title: string;
  producer: string;
  releaseDate: string;
  view: number;
  like: number;
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
  chaps?: {
    title: string;
    image: string;
    eps: {
      title: string,
      url: string,
      date: string,
    }[]
  }[];
  mangachaps?: {
    id: string,
    urls: string[]
  }[],
  current?: number;
  end?: number;
  history?: {
    title: string,
    url: string
  };

  image: string;
  thumbnail: string;
  auth: {
    id: string;
    image: string;
    name: string;
  }
}

type Category = {
  id: string,
  name: string
}