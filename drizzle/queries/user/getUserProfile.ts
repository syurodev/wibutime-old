"use server"

import { eq } from "drizzle-orm"

import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema"

export const getUserProfile = async (userId: string) => {
  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        id: true,
        image: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
        emailVerified: true,
        phoneVerified: false,
        description: true,
      },
      with: {
        animes: {
          columns: {
            id: true,
            name: true,
            createdAt: true,
          },
          with: {
            user: {
              columns: {
                id: true
              }
            },
            seasons: {
              columns: {
                id: true,
                name: true,
                image: true,
              },
              with: {
                episode: {
                  columns: {
                    id: true,
                    viewed: true
                  }
                }
              }
            }
          }
        },
        mangas: {
          columns: {
            id: true,
            name: true,
            createdAt: true,
          },
          with: {
            user: {
              columns: {
                id: true
              }
            },
            seasons: {
              columns: {
                id: true,
                name: true,
                image: true,
              },
              with: {
                chapters: {
                  columns: {
                    id: true,
                    viewed: true
                  }
                }
              }
            }
          }
        },
        lightnovels: {
          columns: {
            id: true,
            name: true,
            createdAt: true,
            image: true,
          },
          with: {
            user: {
              columns: {
                id: true
              }
            },
            volumes: {
              columns: {
                id: true,
                name: true,
                image: true,
                createdAt: true,
              },
              with: {
                chapters: {
                  columns: {
                    id: true,
                    viewed: true,
                    words: true
                  }
                }
              }
            }
          }
        },
        favorite: {
          with: {
            animes: {
              with: {
                anime: {
                  columns: {
                    id: true,
                    name: true,
                  },
                  with: {
                    seasons: {
                      columns: {
                        id: true,
                        name: true,
                        image: true
                      }
                    },
                    user: {
                      columns: {
                        id: true,
                        name: true,
                        image: true,
                      }
                    }
                  }
                }
              }
            },
            mangas: {
              with: {
                manga: {
                  columns: {
                    id: true,
                    name: true,
                  },
                  with: {
                    seasons: {
                      columns: {
                        id: true,
                        name: true,
                        image: true
                      }
                    },
                    user: {
                      columns: {
                        id: true,
                        name: true,
                        image: true,
                      }
                    }
                  }
                }
              }
            },
            lightnovels: {
              with: {
                lightnovel: {
                  columns: {
                    id: true,
                    name: true,
                    image: true,
                  },
                  with: {
                    user: {
                      columns: {
                        id: true,
                        name: true,
                        image: true,
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!existingUser) return null

    return existingUser
  } catch (error) {
    console.log(error)
    return null
  }
}