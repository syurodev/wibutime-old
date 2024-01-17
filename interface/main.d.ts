type ContinueData = {
  id: string;
  image?: {
    key: string
    url: string
  } | null,
  current: number;
  history: number;
  type: string;
}

type NewlyData = {
  id: string;
  image?: {
    key: string
    url: string
  } | null,
  current: number;
  end?: number;
  type: "anime" | "manga" | "lightnovel";
  name: string;
}