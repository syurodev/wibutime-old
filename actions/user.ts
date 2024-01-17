"use server"

import { db } from "@/lib/db"

export const getUserDetail = async (id: string) => {
  try {
    const user: UserProfile | null = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        phoneVerified: false,
        id: true,
        image: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
        emailVerified: true,
        coverImage: true,
        description: true,
        animes: {
          select: {
            name: true,
            image: true,
            createdAt: true,
            id: true,
            user: {
              select: {
                id: true
              }
            },
            episodes: {
              select: {
                viewed: true
              }
            }
          }
        },
        mangas: {
          select: {
            name: true,
            image: true,
            createdAt: true,
            id: true,
            user: {
              select: {
                id: true
              }
            },
            chapters: {
              select: {
                viewed: true
              }
            }
          }
        },
        lightnovels: {
          select: {
            name: true,
            image: true,
            createdAt: true,
            id: true,
            user: {
              select: {
                id: true
              }
            },
            chapters: {
              select: {
                viewed: true
              }
            }
          }
        },
        favorites: {
          select: {
            animes: {
              select: {
                name: true,
                id: true,
                image: true,
                user: {
                  select: {
                    id: true
                  }
                },
              }
            },
            lightnovels: {
              select: {
                name: true,
                id: true,
                image: true,
                user: {
                  select: {
                    id: true
                  }
                },
              }
            },
            mangas: {
              select: {
                name: true,
                id: true,
                image: true,
                user: {
                  select: {
                    id: true
                  }
                },
              }
            }
          }
        },
      },
    })

    if (!user) return {
      code: 404,
      message: "Không tìm thấy người dùng",
      data: null
    }

    return {
      code: 200,
      message: "success",
      data: user
    }
  } catch (error) {
    console.log(error)
    return {
      code: 500,
      message: "Lỗi server vui lòng thử lại",
      data: null
    }
  }
}