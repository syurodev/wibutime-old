import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { text, timestamp, pgTable, jsonb, boolean, integer, primaryKey, uuid, date, varchar, time } from "drizzle-orm/pg-core";
import type { AdapterAccount } from '@auth/core/adapters'


export const users = pgTable("user", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  username: text("username").unique(),
  image: text("image"),
  coins: integer("coins").default(0),
  imageKey: text("image_key").default(""),
  description: jsonb("description"),
  email: text("email").notNull().unique(),
  phone: text("phone").unique(),
  hashedPassword: text("hashed_password"),
  emailVerified: boolean("emailVerified").default(false),
  phoneVerified: boolean("phoneVerified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type User = InferSelectModel<typeof users>
export type UserInsert = InferInsertModel<typeof users>

export const usersRelations = relations(users, ({ one, many }) => ({
  roles: many(userOnRole),
  followedUsers: many(followerUser, { relationName: "followed_user" }),
  followerUsers: many(followerUser, { relationName: "follower_user" }),
  followerGroups: many(followerGroup, { relationName: "follower_groups" }),
  lightnovels: many(lightnovel),
  animes: many(anime),
  mangas: many(manga),
  adminGroups: many(translationGroup),
  groups: many(translationGroupMembers),
  comments: many(comment),
  favorite: one(favorite)
}));

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  })
)

export const followerUser = pgTable("follower_user", {
  followedBy: uuid("followed_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  following: uuid("following")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
},
  (t) => ({
    pk: primaryKey(t.followedBy, t.following),
  }))

export const followerUserRelations = relations(followerUser, ({ one }) => ({
  followedUser: one(users, {
    relationName: "followed_user",
    fields: [followerUser.following],
    references: [users.id]
  }),

  followerUser: one(users, {
    relationName: "follower_user",
    fields: [followerUser.followedBy],
    references: [users.id]
  })
}));

export const followerGroup = pgTable("follower_group", {
  followerId: uuid("follower_id")
    .notNull()
    .references(() => users.id),
  followedId: uuid("followed_id")
    .notNull()
    .references(() => translationGroup.id),
},
  (t) => ({
    pk: primaryKey(t.followerId, t.followedId),
  }))

export const followerGroupRelations = relations(followerGroup, ({ one }) => ({
  followed: one(translationGroup, {
    relationName: "followed_group",
    fields: [followerGroup.followedId],
    references: [translationGroup.id]
  }),

  follower: one(users, {
    relationName: "user_to_group",
    fields: [followerGroup.followerId],
    references: [users.id]
  })
}))

export const role = pgTable("role", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

export type Role = InferSelectModel<typeof role>
export type RoleInsert = InferInsertModel<typeof role>

export const roleRelations = relations(role, ({ many }) => ({
  users: many(userOnRole),
  permission: many(permissionOnRole),
}));

export const userOnRole = pgTable(
  "user_roles",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    roleId: uuid("role_id")
      .notNull()
      .references(() => role.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.roleId),
  })
);

export const userOnRoleRelations = relations(userOnRole, ({ one }) => ({
  user: one(users, {
    fields: [userOnRole.userId],
    references: [users.id]
  }),

  role: one(role, {
    fields: [userOnRole.roleId],
    references: [role.id]
  })
}))

export const permission = pgTable("permission", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

export type Permission = InferSelectModel<typeof permission>
export type PermissionInsert = InferInsertModel<typeof permission>

export const permissionRelations = relations(permission, ({ many }) => ({
  roles: many(permissionOnRole),
}));

export const permissionOnRole = pgTable("permission_role", {
  roleId: uuid("role_id")
    .notNull()
    .references(() => role.id),
  permissionId: uuid("permission_id")
    .notNull()
    .references(() => permission.id),
}, (t) => ({
  pk: primaryKey(t.roleId, t.permissionId),
}))

export const permissionOnRoleRelations = relations(permissionOnRole, ({ one }) => ({
  permission: one(permission, {
    fields: [permissionOnRole.permissionId],
    references: [permission.id]
  }),

  role: one(role, {
    fields: [permissionOnRole.roleId],
    references: [role.id]
  })
}))

export const verificationToken = pgTable("verification_token", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires").notNull()
})

export type VerificationToken = InferSelectModel<typeof verificationToken>
export type VerificationTokenInsert = InferInsertModel<typeof verificationToken>

export const resetPasswordToken = pgTable("reset_password_token", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires").notNull()
})

export type ResetPasswordToken = InferSelectModel<typeof resetPasswordToken>
export type ResetPasswordTokenInsert = InferInsertModel<typeof resetPasswordToken>

//* Translation Group
export const translationGroup = pgTable("translation_group", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  description: jsonb("description"),
  name: text("name").notNull(),
  image: jsonb("image").default({ key: "", url: "" }),

  admin: uuid("user_id").references(() => users.id, { onDelete: "cascade" })
});

export const translationGroupRelations = relations(translationGroup, ({ many }) => ({
  lightnovels: many(lightnovel),
  animes: many(anime),
  mangas: many(manga),
  followers: many(followerGroup),
  members: many(translationGroupMembers)
}))

export type TranslationGroup = InferSelectModel<typeof translationGroup>
export type TranslationGroupInsert = InferInsertModel<typeof translationGroup>

export const translationGroupMembers = pgTable("translation_group_members", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  groupId: uuid("group_id")
    .notNull()
    .references(() => translationGroup.id),
}, (t) => ({
  pk: primaryKey(t.userId, t.groupId),
}))

export const translationGroupMembersRelations = relations(translationGroupMembers, ({ one }) => ({
  user: one(permission, {
    fields: [translationGroupMembers.userId],
    references: [permission.id]
  }),

  group: one(role, {
    fields: [translationGroupMembers.groupId],
    references: [role.id]
  })
}))

//* Lightnovel
export const lightnovel = pgTable("lightnovel", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  otherNames: jsonb("other_names").default([]),
  author: varchar("author", { length: 70 }),
  artist: varchar("artist", { length: 70 }),
  image: jsonb("image").default({ key: "", url: "" }),
  summary: jsonb("summary"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  status: text("status", { enum: ["Pause", "Complete", "InProcess"] }),
  note: jsonb("note"),

  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  translationGroup: uuid("translation_group_id").references(() => translationGroup.id, { onDelete: "set null" })
});

export const lightnovelRelations = relations(lightnovel, (({ one, many }) => ({
  categories: many(categoryToLightnovel),
  rating: many(rating),
  comments: many(commentToLightnovel),
  favorite: many(favoriteToLightnovel),
  volumes: many(lightnovelVolume),
  user: one(users, {
    fields: [lightnovel.userId],
    references: [users.id]
  }),
  translationGroup: one(translationGroup, {
    fields: [lightnovel.translationGroup],
    references: [translationGroup.id]
  })
})))

export type Lightnovel = InferSelectModel<typeof lightnovel>
export type LightnovelInsert = InferInsertModel<typeof lightnovel>

export const lightnovelVolume = pgTable("lightnovel_volume", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  image: jsonb("image").default({ key: "", url: "" }),
  deleted: boolean("deleted").default(false),

  lightnovelId: uuid("lightnovel_id").references(() => lightnovel.id, { onDelete: "cascade" }).notNull()
});

export type LightnovelVolume = InferSelectModel<typeof lightnovelVolume>
export type LightnovelVolumeInsert = InferInsertModel<typeof lightnovelVolume>

export const lightnovelVolumeRelations = relations(lightnovelVolume, (({ one, many }) => ({
  lightnovel: one(lightnovel, {
    fields: [lightnovelVolume.lightnovelId],
    references: [lightnovel.id]
  }),
  chapters: many(lightnovelChapter),
})))

export const lightnovelChapter = pgTable("lightnovel_chapter", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  content: jsonb("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  viewed: integer("viewed").default(0),
  words: integer("words").default(0),
  viewed_at: timestamp("viewed_at"),

  volumeId: uuid("volume_id").references(() => lightnovelVolume.id, { onDelete: "cascade" }).notNull()
});

export type LightnovelChapter = InferSelectModel<typeof lightnovelChapter>
export type LightnovelChapterInsert = InferInsertModel<typeof lightnovelChapter>

export const lightnovelChapterRelations = relations(lightnovelChapter, (({ one, many }) => ({
  volume: one(lightnovelVolume, {
    fields: [lightnovelChapter.volumeId],
    references: [lightnovelVolume.id]
  }),
  comments: many(commentToLightnovelChapter),
})))

//* Anime
export const anime = pgTable("anime", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  otherNames: jsonb("other_names").default([]),
  summary: jsonb("summary"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  status: text("status", { enum: ["Pause", "Complete", "InProcess"] }),
  note: jsonb("note"),

  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  translationGroup: uuid("translation_group_id").references(() => translationGroup.id, { onDelete: "set null" })
});

export const animeRelations = relations(anime, (({ one, many }) => ({
  categories: many(categoryToAnime),
  rating: many(rating),
  comments: many(commentToAnime),
  favorite: many(favoriteToAnime),
  seasons: many(animeSeason),
  user: one(users, {
    fields: [anime.userId],
    references: [users.id]
  }),
  translationGroup: one(translationGroup, {
    fields: [anime.translationGroup],
    references: [translationGroup.id]
  })
})))

export type Anime = InferSelectModel<typeof anime>
export type AnimeInsert = InferInsertModel<typeof anime>

export const animeSeason = pgTable("anime_season", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  image: jsonb("image").default({ key: "", url: "" }),
  musics: jsonb("musics").default([]),
  studio: text("studio").notNull(),
  broadcastTime: timestamp("broadcast_time").notNull(),
  broadcastDay: varchar("broadcast_day", { length: 10 }).notNull(),
  aired: date("aired").notNull(),
  numberOfEpisodes: integer("number_of_episodes"),

  animeId: uuid("anime_id").references(() => anime.id, { onDelete: "cascade" }).notNull()
});

export type AnimeSeason = InferSelectModel<typeof animeSeason>
export type AnimeSeasonInsert = InferInsertModel<typeof animeSeason>

export const animeSeasonRelations = relations(animeSeason, (({ one, many }) => ({
  anime: one(anime, {
    fields: [animeSeason.animeId],
    references: [anime.id]
  }),
  episode: many(animeEpisode),
})))

export const animeEpisode = pgTable("anime_episode", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  content: jsonb("content").default({ key: "", url: "" }).notNull(),
  thumbnail: jsonb("thumbnail").default({ key: "", url: "" }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  viewed: integer("viewed").default(0),
  index: varchar("index", { length: 6 }).notNull(),
  viewed_at: timestamp("viewed_at"),

  seasonId: uuid("season_id").references(() => animeSeason.id, { onDelete: "cascade" }).notNull()
});

export type AnimeEpisode = InferSelectModel<typeof animeEpisode>
export type AnimeEpisodeInsert = InferInsertModel<typeof animeEpisode>

export const animeEpisodeRelations = relations(animeEpisode, (({ one, many }) => ({
  season: one(animeSeason, {
    fields: [animeEpisode.seasonId],
    references: [animeSeason.id]
  }),
  comment: many(commentToAnimeEpisode),
})))

//* Manga
export const manga = pgTable("manga", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  otherNames: jsonb("other_names").default([]),
  summary: jsonb("summary"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  status: text("status", { enum: ["Pause", "Complete", "InProcess"] }),
  note: jsonb("note"),

  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  translationGroup: uuid("translation_group_id").references(() => translationGroup.id, { onDelete: "set null" })
});

export const mangaRelations = relations(manga, (({ one, many }) => ({
  categories: many(categoryToManga),
  rating: many(rating),
  comments: many(commentToManga),
  favorite: many(favoriteToManga),
  seasons: many(mangaSeason),
  user: one(users, {
    fields: [manga.userId],
    references: [users.id]
  }),
  translationGroup: one(translationGroup, {
    fields: [manga.translationGroup],
    references: [translationGroup.id]
  })
})))

export type Manga = InferSelectModel<typeof manga>
export type MangaInsert = InferInsertModel<typeof manga>

export const mangaSeason = pgTable("manga_season", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  image: jsonb("image").default({ key: "", url: "" }),
  musics: jsonb("musics").default([]),
  studio: text("studio").notNull(),
  broadcastTime: date("broadcast_time").notNull(),
  broadcastDay: varchar("broadcast_day", { length: 10 }).notNull(),
  aired: date("aired").notNull(),
  numberOfEpisodes: integer("number_of_episodes"),

  mangaId: uuid("manga_id").references(() => manga.id, { onDelete: "cascade" }).notNull()
});

export type MangaSeason = InferSelectModel<typeof mangaSeason>
export type MangaSeasonInsert = InferInsertModel<typeof mangaSeason>

export const mangaSeasonRelations = relations(mangaSeason, (({ one, many }) => ({
  manga: one(manga, {
    fields: [mangaSeason.mangaId],
    references: [manga.id]
  }),
  chapters: many(mangaChapter),
})))

export const mangaChapter = pgTable("manga_chapter", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  content: jsonb("content").default({ key: "", url: "" }).notNull(),
  thumbnail: jsonb("thumbnail").default({ key: "", url: "" }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  viewed: integer("viewed").default(0),
  index: varchar("index", { length: 6 }),
  viewed_at: timestamp("created_at"),

  seasonId: uuid("season_id").references(() => mangaSeason.id, { onDelete: "cascade" }).notNull()
});

export type MangaChapter = InferSelectModel<typeof mangaChapter>
export type MangaChapterInsert = InferInsertModel<typeof mangaChapter>

export const mangaChapterRelations = relations(mangaChapter, (({ one, many }) => ({
  season: one(mangaSeason, {
    fields: [mangaChapter.seasonId],
    references: [mangaSeason.id]
  }),
  comment: many(commentToMangaChapter),
})))

//* Categories
export const category = pgTable("category", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
})

export const categoryRelations = relations(category, (({ many }) => ({
  lightnovels: many(categoryToLightnovel)
})))

export type Category = InferSelectModel<typeof category>
export type CategoryInsert = InferInsertModel<typeof category>

//* cate ln
export const categoryToLightnovel = pgTable("category_lightnovel", {
  categoryId: uuid("category_id")
    .notNull()
    .references(() => category.id),
  lightnovelId: uuid("lightnovel_id")
    .notNull()
    .references(() => lightnovel.id),
}, (t) => ({
  pk: primaryKey(t.categoryId, t.lightnovelId),
}))

export const categoryToLightnovelRelations = relations(categoryToLightnovel, (({ one }) => ({
  category: one(category, {
    fields: [categoryToLightnovel.categoryId],
    references: [category.id]
  }),
  lightnovel: one(lightnovel, {
    fields: [categoryToLightnovel.lightnovelId],
    references: [lightnovel.id]
  }),
})))

export type CategoryToLightnovel = InferSelectModel<typeof categoryToLightnovel>
export type CategoryToLightnovelInsert = InferInsertModel<typeof categoryToLightnovel>

//* cate anime
export const categoryToAnime = pgTable("category_anime", {
  categoryId: uuid("category_id")
    .notNull()
    .references(() => category.id),
  animeId: uuid("anime_id")
    .notNull()
    .references(() => anime.id),
}, (t) => ({
  pk: primaryKey(t.categoryId, t.animeId),
}))

export const categoryToAnimeRelations = relations(categoryToAnime, (({ one }) => ({
  category: one(category, {
    fields: [categoryToAnime.categoryId],
    references: [category.id]
  }),
  anime: one(anime, {
    fields: [categoryToAnime.animeId],
    references: [anime.id]
  }),
})))

export type CategoryToAnime = InferSelectModel<typeof categoryToAnime>
export type CategoryToAnimeInsert = InferInsertModel<typeof categoryToAnime>

//* cate manga
export const categoryToManga = pgTable("category_manga", {
  categoryId: uuid("category_id")
    .notNull()
    .references(() => category.id),
  mangaId: uuid("manga_id")
    .notNull()
    .references(() => manga.id),
}, (t) => ({
  pk: primaryKey(t.categoryId, t.mangaId),
}))

export const categoryToMangaRelations = relations(categoryToManga, (({ one }) => ({
  category: one(category, {
    fields: [categoryToManga.categoryId],
    references: [category.id]
  }),
  manga: one(manga, {
    fields: [categoryToManga.mangaId],
    references: [manga.id]
  }),
})))

export type CategoryToManga = InferSelectModel<typeof categoryToManga>
export type CategoryToMangaInsert = InferInsertModel<typeof categoryToManga>

//* rating
export const rating = pgTable("rating", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  score: integer("score").default(0).notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),

  lightnovelId: uuid("lightnovel_id"),
  animeId: uuid("anime_id"),
  mangaId: uuid("manga_id")
})

export const ratingRelations = relations(rating, (({ one }) => ({
  lightnovel: one(lightnovel, {
    fields: [rating.lightnovelId],
    references: [lightnovel.id]
  }),
  anime: one(anime, {
    fields: [rating.animeId],
    references: [anime.id]
  }),
  manga: one(manga, {
    fields: [rating.mangaId],
    references: [manga.id]
  })
})))

export type Rating = InferSelectModel<typeof rating>
export type RatingInsert = InferInsertModel<typeof rating>

//* comment
export const comment = pgTable("comment", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  comment: jsonb("comment").notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),

  reply: uuid("reply")
})

export const commentRelations = relations(comment, (({ one, many }) => ({
  user: one(users, {
    fields: [comment.userId],
    references: [users.id]
  }),

  reply: one(comment, {
    fields: [comment.reply],
    references: [comment.id]
  }),

  lightnovel: many(commentToLightnovel),
  lightnovelChapter: many(commentToLightnovelChapter),
  anime: many(commentToAnime),
  animeEpisode: many(commentToAnimeEpisode),
  manga: many(commentToManga),
  mangaChapter: many(commentToMangaChapter),
})))

export type Comment = InferSelectModel<typeof comment>
export type CommentInsert = InferInsertModel<typeof comment>

//* comment to lightnovel
export const commentToLightnovel = pgTable("comment_lightnovel", {
  commentId: uuid("comment_id")
    .notNull()
    .references(() => comment.id),
  lightnovelId: uuid("lightnovel_id")
    .notNull()
    .references(() => lightnovel.id),
}, (t) => ({
  pk: primaryKey(t.commentId, t.lightnovelId),
}))

export const commentToLightnovelRelations = relations(commentToLightnovel, (({ one }) => ({
  comment: one(comment, {
    fields: [commentToLightnovel.commentId],
    references: [comment.id]
  }),
  lightnovel: one(lightnovel, {
    fields: [commentToLightnovel.lightnovelId],
    references: [lightnovel.id]
  }),
})))

//* comment to lightnovel chapter
export const commentToLightnovelChapter = pgTable("comment_lightnovel_chapter", {
  commentId: uuid("comment_id")
    .notNull()
    .references(() => comment.id),
  chapterId: uuid("chapter_id")
    .notNull()
    .references(() => lightnovelChapter.id),
}, (t) => ({
  pk: primaryKey(t.commentId, t.chapterId),
}))

export const commentToLightnovelChapterRelations = relations(commentToLightnovelChapter, (({ one }) => ({
  comment: one(comment, {
    fields: [commentToLightnovelChapter.commentId],
    references: [comment.id]
  }),
  chapter: one(lightnovelChapter, {
    fields: [commentToLightnovelChapter.chapterId],
    references: [lightnovelChapter.id]
  }),
})))

//* comment to anime
export const commentToAnime = pgTable("comment_anime", {
  commentId: uuid("comment_id")
    .notNull()
    .references(() => comment.id),
  animeId: uuid("anime_id")
    .notNull()
    .references(() => anime.id),
}, (t) => ({
  pk: primaryKey(t.commentId, t.animeId),
}))

export const commentToAnimeRelations = relations(commentToAnime, (({ one }) => ({
  comment: one(comment, {
    fields: [commentToAnime.commentId],
    references: [comment.id]
  }),
  anime: one(anime, {
    fields: [commentToAnime.animeId],
    references: [anime.id]
  }),
})))

//* comment to anime episode
export const commentToAnimeEpisode = pgTable("comment_anime_episode", {
  commentId: uuid("comment_id")
    .notNull()
    .references(() => comment.id),
  episodeId: uuid("episode_id")
    .notNull()
    .references(() => animeEpisode.id),
}, (t) => ({
  pk: primaryKey(t.commentId, t.episodeId),
}))

export const commentToAnimeEpisodeRelations = relations(commentToAnimeEpisode, (({ one }) => ({
  comment: one(comment, {
    fields: [commentToAnimeEpisode.commentId],
    references: [comment.id]
  }),
  episode: one(anime, {
    fields: [commentToAnimeEpisode.episodeId],
    references: [anime.id]
  }),
})))

//* comment to manga
export const commentToManga = pgTable("comment_manga", {
  commentId: uuid("comment_id")
    .notNull()
    .references(() => comment.id),
  mangaId: uuid("manga_id")
    .notNull()
    .references(() => manga.id),
}, (t) => ({
  pk: primaryKey(t.commentId, t.mangaId),
}))

export const commentToMangaRelations = relations(commentToManga, (({ one }) => ({
  comment: one(comment, {
    fields: [commentToManga.commentId],
    references: [comment.id]
  }),
  manga: one(manga, {
    fields: [commentToManga.mangaId],
    references: [manga.id]
  }),
})))

//* comment to manga chapter
export const commentToMangaChapter = pgTable("comment_manga_chapter", {
  commentId: uuid("comment_id")
    .notNull()
    .references(() => comment.id),
  chapterId: uuid("chapter_id")
    .notNull()
    .references(() => mangaChapter.id),
}, (t) => ({
  pk: primaryKey(t.commentId, t.chapterId),
}))

export const commentToMangaChapterRelations = relations(commentToMangaChapter, (({ one }) => ({
  comment: one(comment, {
    fields: [commentToMangaChapter.commentId],
    references: [comment.id]
  }),
  chapter: one(manga, {
    fields: [commentToMangaChapter.chapterId],
    references: [manga.id]
  }),
})))

//* favorite
export const favorite = pgTable("favorite", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
})

export const favoriteRelations = relations(favorite, (({ one, many }) => ({
  user: one(users, {
    fields: [favorite.userId],
    references: [users.id]
  }),
  lightnovels: many(favoriteToLightnovel),
  animes: many(favoriteToAnime),
  mangas: many(favoriteToManga),
})))

export type Favorite = InferSelectModel<typeof favorite>
export type FavoriteInsert = InferInsertModel<typeof favorite>

//* favorite to lightnovel
export const favoriteToLightnovel = pgTable("favorite_lightnovel", {
  favoriteId: uuid("favorite_id")
    .notNull()
    .references(() => favorite.id),
  lightnovelId: uuid("lightnovel_id")
    .notNull()
    .references(() => lightnovel.id),
}, (t) => ({
  pk: primaryKey(t.favoriteId, t.lightnovelId),
}))

export const favoriteToLightnovelRelations = relations(favoriteToLightnovel, (({ one }) => ({
  favorite: one(favorite, {
    fields: [favoriteToLightnovel.favoriteId],
    references: [favorite.id]
  }),
  lightnovel: one(lightnovel, {
    fields: [favoriteToLightnovel.lightnovelId],
    references: [lightnovel.id]
  }),
})))

//* favorite to anime
export const favoriteToAnime = pgTable("favorite_anime", {
  favoriteId: uuid("favorite_id")
    .notNull()
    .references(() => favorite.id),
  animeId: uuid("anime_id")
    .notNull()
    .references(() => anime.id),
}, (t) => ({
  pk: primaryKey(t.favoriteId, t.animeId),
}))

export const favoriteToAnimeRelations = relations(favoriteToAnime, (({ one }) => ({
  favorite: one(favorite, {
    fields: [favoriteToAnime.favoriteId],
    references: [favorite.id]
  }),
  anime: one(anime, {
    fields: [favoriteToAnime.animeId],
    references: [anime.id]
  }),
})))

//* favorite to manga
export const favoriteToManga = pgTable("favorite_manga", {
  favoriteId: uuid("favorite_id")
    .notNull()
    .references(() => favorite.id),
  mangaId: uuid("manga_id")
    .notNull()
    .references(() => manga.id),
}, (t) => ({
  pk: primaryKey(t.favoriteId, t.mangaId),
}))

export const favoriteToMangaRelations = relations(favoriteToManga, (({ one }) => ({
  favorite: one(favorite, {
    fields: [favoriteToManga.favoriteId],
    references: [favorite.id]
  }),
  manga: one(manga, {
    fields: [favoriteToManga.mangaId],
    references: [manga.id]
  }),
})))