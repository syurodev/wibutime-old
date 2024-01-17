import * as z from "zod"

export const LightnovelContentSchema = z.object({
  type: z.string(),
  content: z.array(z.unknown()).refine((data) => data.length > 0, {
    message: "Vui lòng nhập nội dung",
  }),
});

export const lightnovelSchema = z.object({
  name: z.string().trim().min(1, { message: "Tên lightnovel là bắt buộc" }),
  author: z.string().trim().min(1, { message: "Tên tác giả là bắt buộc" }),
  artist: z.string().optional(),
  // content: LightnovelContentSchema,
  categoryIds: z.array(z.object({
    id: z.string(),
    name: z.string()
  })),
  otherNames: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ).optional(),
  summary: z.string().trim().min(1, { message: "Vui lòng nhập phần tóm tắt" }),
  image: z.object({
    key: z.string().optional(),
    url: z.string().url()
  }),
  coverImage: z.object({
    key: z.string().optional(),
    url: z.string().url()
  }).optional(),
})

export const lightnovelChapterSchema = z.object({
  name: z.string().min(1, { message: "Vui lòng nhập tên chapter" }),
  content: LightnovelContentSchema
})