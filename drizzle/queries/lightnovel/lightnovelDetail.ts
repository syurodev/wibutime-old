import { and, desc, eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { lightnovel, lightnovelChapter, lightnovelVolume, purchaseLightnovelChapter } from "@/drizzle/schema";
import { formatNumber } from "@/lib/formatNumber";
import { findChapterPurchased } from "./findChapterPurchased";

export const lightnovelDetail = async (novelId: string, userId?: string) => {
  try {
    const existingLightnovel = await db.query.lightnovel.findFirst({
      where: and(eq(lightnovel.id, novelId), eq(lightnovel.deleted, false)),
      with: {
        categories: {
          columns: {
            categoryId: false,
            lightnovelId: false
          },
          with: {
            category: true
          }
        },
        volumes: {
          orderBy: desc(lightnovelVolume.createdAt),
          with: {
            chapters: {
              orderBy: desc(lightnovelChapter.createdAt),
              columns: {
                id: true,
                name: true,
                viewed: true,
                words: true,
                createdAt: true,
                charge: true
              },
            }
          }
        },
        user: {
          columns: {
            id: true,
            name: true,
            image: true
          }
        },
        translationGroup: {
          columns: {
            id: true,
            name: true,
            image: true
          }
        },
        favorites: {
          columns: {
            userId: true
          }
        }
      },
    })

    if (!existingLightnovel) return null

    const result: LightnovelDetail = {
      id: existingLightnovel.id,
      name: existingLightnovel.name,
      type: "lightnovel",
      favorited: !userId ? false : checkUserIdExists(existingLightnovel.favorites, userId),
      createdAt: existingLightnovel.createdAt ? existingLightnovel.createdAt.toISOString() : "",
      updateAt: existingLightnovel.updatedAt ? existingLightnovel.updatedAt.toISOString() : "",
      categories: existingLightnovel.categories.map(cate => cate.category),
      favorites: existingLightnovel.favorites,
      otherNames: existingLightnovel.otherNames as string[],
      summary: existingLightnovel.summary,
      note: existingLightnovel.note,
      user: existingLightnovel.user,
      words: formatNumber(existingLightnovel.volumes.reduce((totalWords, volume) => {
        return totalWords + volume.chapters.reduce((volumeWords, chapter) => {
          return volumeWords + (chapter.words || 0);
        }, 0);
      }, 0)),
      viewed: formatNumber(existingLightnovel.volumes.reduce((totalViewed, volume) => {
        return totalViewed + volume.chapters.reduce((volumeViewed, chapter) => {
          return volumeViewed + (chapter.viewed || 0);
        }, 0);
      }, 0)),
      translationGroup: existingLightnovel.translationGroup as {
        id: string;
        image: {
          key?: string,
          url: string
        } | null;
        name: string;
      },
      image: existingLightnovel.image as {
        key?: string,
        url: string
      } | undefined,
      artist: existingLightnovel.artist,
      author: existingLightnovel.author,
      volumes: await Promise.all(existingLightnovel.volumes.map(async (item) => {
        const chapters = await Promise.all(item.chapters.map(async (chapter) => {
          let purchasesId = "";
          if (userId && userId !== existingLightnovel.user.id) {
            const res = await findChapterPurchased(chapter.id, userId);
            if (res) {
              purchasesId = res.id;
            }
          }
          return {
            id: chapter.id,
            name: chapter.name,
            charge: (() => {
              if (!userId) {
                return chapter.charge ?? false;
              } else if (userId === existingLightnovel.user.id) {
                return false
              }
              else {
                return purchasesId !== "" ? false : (chapter.charge ?? false);
              }
            })(),
            createdAt: chapter.createdAt ? chapter.createdAt.toISOString() : "",
            viewed: chapter.viewed || 0
          };
        }));
        return {
          id: item.id,
          name: item.name,
          createdAt: item.createdAt ? item.createdAt.toISOString() : "",
          updateAt: item.createdAt ? item.createdAt.toISOString() : "",
          image: item.image as {
            key?: string,
            url: string
          } | null,
          chapters: chapters // Assign the resolved chapters array
        };
      }))
    }

    return result
  } catch (error) {
    console.log(error)
    return null
  }
}

function checkUserIdExists(arr: { userId: string; }[], userId: string) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].userId === userId) {
      return true;
    }
  }
  return false;
}