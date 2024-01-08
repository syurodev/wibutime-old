type ContinueData = {
  _id: string;
  image: string;
  current: number;
  history: number;
  type: string;
}

type NewlyData = {
  _id: string;
  image: string;
  current: number;
  end: number;
  type: "anime" | "manga" | "lightnovel";
  title: string;
}