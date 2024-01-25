import * as z from "zod"

import { EditorContentSchema } from "./shared"

export const MusicTypeEnum = z.enum(["Opening Theme", "Ending Theme", "OST"]);

export const animeSchema = z.object({
  name: z.string().trim().min(1, { message: "Tên anime là bắt buộc" }),
  other_names: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ).optional(),
  studio: z.string().trim().min(1, { message: "Tên studio là bắt buộc" }),
  broadcast_day: z.string({ required_error: "Vui lòng chọn lịch phát sóng" }),
  broadcast_time: z.date({ required_error: "Vui lòng chọn lịch phát sóng" }),
  aired: z.date({ required_error: "Vui lòng chọn ngày phát sóng" }),
  note: EditorContentSchema.optional(),
  categories: z.array(z.object({
    id: z.string(),
    name: z.string()
  })),
  musics: z.array(z.object({
    type: z.string(),
    name: z.string().min(1, { message: "Vui lòng nhập tên bài hát" }),
    url: z.string().url().refine((value) => {
      return value.includes("youtube.com") || value.includes("spotify.com");
    }, { message: "URL chỉ được chứa domain của YouTube hoặc Spotify" }).optional(),
  })).optional(),
  summary: EditorContentSchema,
  number_of_episodes: z.coerce.number().optional(),
  image: z.object({
    key: z.string().optional(),
    url: z.string().url()
  }).optional(),
})