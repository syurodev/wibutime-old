import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { text, timestamp, pgTable, jsonb, boolean, integer, primaryKey, uuid, date, varchar, time, index } from "drizzle-orm/pg-core";
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
}, (t) => ({
  nameIndex: index("user_name_idx").on(t.name),
  usernameIndex: index("user_username_idx").on(t.username),
}));

export type User = InferSelectModel<typeof users>
export type UserInsert = InferInsertModel<typeof users>

export const usersRelations = relations(users, ({ one, many }) => ({
  roles: many(userOnRole),
  followedUsers: many(followerUser, { relationName: "followed_user" }),
  followerUsers: many(followerUser, { relationName: "follower_user" }),
  followerGroups: many(followerGroup, { relationName: "follower_groups" }),
  lightnovels: many(lightnovel),
  payments: many(payments),
  animes: many(anime),
  mangas: many(manga),
  adminGroups: many(translationGroup),
  groups: many(translationGroupMembers),
  comments: many(comment),
  favoriteLightnovels: many(favoriteToLightnovel),
  favoriteAnimes: many(favoriteToAnime),
  favoriteMangas: many(favoriteToManga),
  purchaseLightnovelChapters: one(purchaseLightnovelChapter),
  purchaseMangaChapters: one(purchaseMangaChapter),
  purchaseAnimeEpisodes: one(purchaseAnimeEpisode),
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
}, (t) => ({
  translationGroupIndex: index("translation_group_name_idx").on(t.name)
}));

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
  otherNames: text("other_names").array().notNull(),
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
}, (t) => ({
  lightnovelNameIndex: index("lightnovel_name_idx").on(t.name),
  lightnovelOtherNameIndex: index("lightnovel_other_name_idx").on(t.otherNames)
}));

export const lightnovelRelations = relations(lightnovel, (({ one, many }) => ({
  categories: many(categoryToLightnovel),
  rating: many(rating),
  comments: many(commentToLightnovel),
  favorites: many(favoriteToLightnovel),
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
  charge: boolean("charge").default(false),

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
  purchases: many(purchaseLightnovelChapter),
})))

//* Anime
export const anime = pgTable("anime", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  otherNames: text("other_names").array().notNull(),
  summary: jsonb("summary"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  status: text("status", { enum: ["Pause", "Complete", "InProcess"] }),
  note: jsonb("note"),

  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  translationGroup: uuid("translation_group_id").references(() => translationGroup.id, { onDelete: "set null" })
}, (t) => ({
  animeNameIndex: index("anime_name_idx").on(t.name),
  animeOtherNameIndex: index("anime_other_name_idx").on(t.otherNames)
}));

export const animeRelations = relations(anime, (({ one, many }) => ({
  categories: many(categoryToAnime),
  rating: many(rating),
  comments: many(commentToAnime),
  favorites: many(favoriteToAnime),
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
  charge: boolean("charge").default(false),

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
  purchases: many(purchaseAnimeEpisode),
})))

//* Manga
export const manga = pgTable("manga", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  otherNames: text("other_names").array().notNull(),
  summary: jsonb("summary"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deleted: boolean("deleted").default(false),
  status: text("status", { enum: ["Pause", "Complete", "InProcess"] }),
  note: jsonb("note"),

  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  translationGroup: uuid("translation_group_id").references(() => translationGroup.id, { onDelete: "set null" })
}, (t) => ({
  mangaNameIndex: index("manga_name_idx").on(t.name),
  mangaOtherNameIndex: index("manga_other_name_idx").on(t.otherNames)
}));

export const mangaRelations = relations(manga, (({ one, many }) => ({
  categories: many(categoryToManga),
  rating: many(rating),
  comments: many(commentToManga),
  favorites: many(favoriteToManga),
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
  charge: boolean("charge").default(false),

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
  purchases: many(purchaseMangaChapter),
})))

//* Categories
export const category = pgTable("category", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  name: text("name").notNull(),
})

export const categoryRelations = relations(category, (({ many }) => ({
  lightnovels: many(categoryToLightnovel),
  animes: many(categoryToAnime),
  mangas: many(categoryToManga),
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

//* favorite to lightnovel
export const favoriteToLightnovel = pgTable("favorite_lightnovel", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  lightnovelId: uuid("lightnovel_id")
    .notNull()
    .references(() => lightnovel.id),
}, (t) => ({
  pk: primaryKey(t.userId, t.lightnovelId),
  userFavoriteLightnovelIndex: index("user_lightnovel_fav_idx").on(t.userId)
}))

export const favoriteToLightnovelRelations = relations(favoriteToLightnovel, (({ one }) => ({
  user: one(users, {
    fields: [favoriteToLightnovel.userId],
    references: [users.id]
  }),
  lightnovel: one(lightnovel, {
    fields: [favoriteToLightnovel.lightnovelId],
    references: [lightnovel.id]
  }),
})))

//* favorite to anime
export const favoriteToAnime = pgTable("favorite_anime", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  animeId: uuid("anime_id")
    .notNull()
    .references(() => anime.id),
}, (t) => ({
  pk: primaryKey(t.userId, t.animeId),
  userFavoriteAnimeIndex: index("user_anime_fav_idx").on(t.userId)
}))

export const favoriteToAnimeRelations = relations(favoriteToAnime, (({ one }) => ({
  user: one(users, {
    fields: [favoriteToAnime.userId],
    references: [users.id]
  }),
  anime: one(anime, {
    fields: [favoriteToAnime.animeId],
    references: [anime.id]
  }),
})))

//* favorite to manga
export const favoriteToManga = pgTable("favorite_manga", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  mangaId: uuid("manga_id")
    .notNull()
    .references(() => manga.id),
}, (t) => ({
  pk: primaryKey(t.userId, t.mangaId),
  userFavoriteMangaIndex: index("user_manga_fav_idx").on(t.userId)
}))

export const favoriteToMangaRelations = relations(favoriteToManga, (({ one }) => ({
  user: one(users, {
    fields: [favoriteToManga.userId],
    references: [users.id]
  }),
  manga: one(manga, {
    fields: [favoriteToManga.mangaId],
    references: [manga.id]
  }),
})))

//*payment
export const payments = pgTable("payments", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  code: text("code").notNull(),
  service: text("service", { enum: ["vnp"] }).notNull(),
  amount: integer("amount"),
  payDate: timestamp("pay_date"),
  bankCode: text("bank_code"),
  bankTransactionCode: text("bank_transaction_code"),
  cardType: text("card_type"),
  status: text("status", { enum: ["success", "pending", "reject"] }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const paymentsRelations = relations(payments, (({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id]
  }),
})))

export type Payments = InferSelectModel<typeof payments>
export type PaymentsInsert = InferInsertModel<typeof payments>

//*purchase
export const purchaseLightnovelChapter = pgTable("purchase_lightnovel_chapter", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  chapterId: uuid("chapter_id").references(() => lightnovelChapter.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (t) => ({
  userPurchaseLightnovelChapter: index("user_purchase_lightnovel_chapter_idx").on(t.userId),
  lightnovelChapterPurchased: index("lightnovel_chapter_purchased_idx").on(t.chapterId)
}))

export const purchaseLightnovelChapterRelations = relations(purchaseLightnovelChapter, (({ one }) => ({
  user: one(users, {
    fields: [purchaseLightnovelChapter.userId],
    references: [users.id]
  }),
  chapter: one(lightnovelChapter, {
    fields: [purchaseLightnovelChapter.chapterId],
    references: [lightnovelChapter.id]
  }),
  fee: one(transactionFeeLightnovel),
})))

export type PurchaseLightnovelChapter = InferSelectModel<typeof purchaseLightnovelChapter>
export type PurchaseLightnovelChapterInsert = InferInsertModel<typeof purchaseLightnovelChapter>

export const purchaseMangaChapter = pgTable("purchase_manga_chapter", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  chapterId: uuid("chapter_id").references(() => mangaChapter.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (t) => ({
  userPurchaseMangaChapter: index("user_purchase_manga_chapter_idx").on(t.userId),
  mangaChapterPurchased: index("manga_chapter_purchased_idx").on(t.chapterId)
}))

export const purchaseMangaChapterRelations = relations(purchaseMangaChapter, (({ one }) => ({
  user: one(users, {
    fields: [purchaseMangaChapter.userId],
    references: [users.id]
  }),
  chapter: one(mangaChapter, {
    fields: [purchaseMangaChapter.chapterId],
    references: [mangaChapter.id]
  }),
  fee: one(transactionFeeManga),
})))

export type PurchaseMangaChapter = InferSelectModel<typeof purchaseMangaChapter>
export type PurchaseMangaChapterInsert = InferInsertModel<typeof purchaseMangaChapter>

export const purchaseAnimeEpisode = pgTable("purchase_anime_episode", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  episodeId: uuid("episode_id").references(() => animeEpisode.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (t) => ({
  userPurchaseAnimeEpisode: index("user_purchase_anime_ep_idx").on(t.userId),
  animeEpisodePurchased: index("anime_ep_purchased_idx").on(t.episodeId)
}))

export const purchaseAnimeEpisodeRelations = relations(purchaseAnimeEpisode, (({ one }) => ({
  user: one(users, {
    fields: [purchaseAnimeEpisode.userId],
    references: [users.id]
  }),
  episode: one(animeEpisode, {
    fields: [purchaseAnimeEpisode.episodeId],
    references: [animeEpisode.id]
  }),
  fee: one(transactionFeeAnime),
})))

export type PurchaseAnimeEpisode = InferSelectModel<typeof purchaseAnimeEpisode>
export type PurchaseAnimeEpisodeInsert = InferInsertModel<typeof purchaseAnimeEpisode>

//*fee
export const transactionFeeLightnovel = pgTable("transaction_fee_lightnovel", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  transaction: uuid("transaction").references(() => purchaseLightnovelChapter.id, { onDelete: "cascade" }).notNull(),
  amount: integer("amount").notNull(),
}, (t) => ({
  transactionFeeLightnovelIndex: index("transaction_fee_lightnovel_idx").on(t.transaction)
}))

export type TransactionFeeLightnovel = InferSelectModel<typeof transactionFeeLightnovel>
export type TransactionFeeLightnovelInsert = InferInsertModel<typeof transactionFeeLightnovel>

export const transactionFeeLightnovelRelations = relations(transactionFeeLightnovel, (({ one }) => ({
  transaction: one(purchaseLightnovelChapter, {
    fields: [transactionFeeLightnovel.transaction],
    references: [purchaseLightnovelChapter.id]
  }),
})))

export const transactionFeeManga = pgTable("transaction_fee_manga", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  transaction: uuid("transaction").references(() => purchaseMangaChapter.id, { onDelete: "cascade" }).notNull(),
  amount: integer("amount").notNull(),
}, (t) => ({
  transactionFeeMangaIndex: index("transaction_fee_manga_idx").on(t.transaction)
}))

export type TransactionFeeManga = InferSelectModel<typeof transactionFeeManga>
export type TransactionFeeMangaInsert = InferInsertModel<typeof transactionFeeManga>

export const transactionFeeMangaRelations = relations(transactionFeeManga, (({ one }) => ({
  transaction: one(purchaseMangaChapter, {
    fields: [transactionFeeManga.transaction],
    references: [purchaseMangaChapter.id]
  }),
})))

export const transactionFeeAnime = pgTable("transaction_fee_anime", {
  id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
  transaction: uuid("transaction").references(() => purchaseAnimeEpisode.id, { onDelete: "cascade" }).notNull(),
  amount: integer("amount").notNull(),
}, (t) => ({
  transactionFeeAnimeIndex: index("transaction_fee_anime_idx").on(t.transaction)
}))

export type TransactionFeeAnime = InferSelectModel<typeof transactionFeeAnime>
export type TransactionFeeAnimeInsert = InferInsertModel<typeof transactionFeeAnime>

export const transactionFeeAnimeRelations = relations(transactionFeeAnime, (({ one }) => ({
  transaction: one(purchaseAnimeEpisode, {
    fields: [transactionFeeAnime.transaction],
    references: [purchaseAnimeEpisode.id]
  }),
})))