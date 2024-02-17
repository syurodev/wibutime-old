"use server"

import { searchContent } from "@/drizzle/queries/search/searchContent"

export const search = async (value: string): Promise<{
  id: string;
  name: string;
  image?: {
    key: string;
    url: string;
  } | null | undefined;
  type: ContentType;
}[]> => {
  try {
    const result: {
      id: string;
      name: string;
      image?: string | null;
      type: ContentType;
    }[] = await searchContent(value)

    if (result.length === 0) return []

    const formated: {
      id: string;
      name: string;
      image?: {
        key: string;
        url: string;
      } | null | undefined;
      type: ContentType;
    }[] = result.map(item => ({
      id: item.id,
      name: item.name,
      type: item.type,
      image: item.image ? JSON.parse(item.image) : null
    }))

    return formated
  } catch (error) {
    console.log(error)
    return []
  }
}