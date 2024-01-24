import * as z from "zod"

export const LightnovelContentSchema = z.object({
  type: z.string(),
  content: z.array(z.any()).refine((data) => data.length > 0, {
    message: "Vui lòng nhập nội dung",
  }),
});

export const lightnovelSchema = z.object({
  name: z.string().trim().min(1, { message: "Tên lightnovel là bắt buộc" }),
  author: z.string().trim().min(1, { message: "Tên tác giả là bắt buộc" }),
  artist: z.string().optional(),
  note: LightnovelContentSchema.optional(),
  categories: z.array(z.object({
    id: z.string(),
    name: z.string()
  })),
  other_names: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ).optional(),
  summary: LightnovelContentSchema,
  image: z.object({
    key: z.string().optional(),
    url: z.string().url()
  }).optional(),
})

export const lightnovelVolumeSchema = z.object({
  name: z.string().min(1, { message: "Vui lòng nhập tên chapter" }),
  image: z.object({
    key: z.string().optional(),
    url: z.string().url()
  }).optional(),
})

export const lightnovelChapterSchema = z.object({
  name: z.string().min(1, { message: "Vui lòng nhập tên chapter" }),
  volume_id: z.string().min(1, { message: "Vui lòng chọn volume" }),
  content: LightnovelContentSchema
})