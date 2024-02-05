ALTER TABLE "anime" ALTER COLUMN "other_names" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "other_names" SET DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "summary" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "anime" ALTER COLUMN "note" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "anime_episode" ALTER COLUMN "content" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "anime_episode" ALTER COLUMN "content" SET DEFAULT '{"key":"","url":""}'::jsonb;--> statement-breakpoint
ALTER TABLE "anime_episode" ALTER COLUMN "thumbnail" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "anime_episode" ALTER COLUMN "thumbnail" SET DEFAULT '{"key":"","url":""}'::jsonb;--> statement-breakpoint
ALTER TABLE "anime_season" ALTER COLUMN "image" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "anime_season" ALTER COLUMN "image" SET DEFAULT '{"key":"","url":""}'::jsonb;--> statement-breakpoint
ALTER TABLE "anime_season" ALTER COLUMN "musics" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "anime_season" ALTER COLUMN "musics" SET DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "comment" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "lightnovel" ALTER COLUMN "other_names" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "lightnovel" ALTER COLUMN "other_names" SET DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "lightnovel" ALTER COLUMN "image" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "lightnovel" ALTER COLUMN "image" SET DEFAULT '{"key":"","url":""}'::jsonb;--> statement-breakpoint
ALTER TABLE "lightnovel" ALTER COLUMN "summary" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "lightnovel" ALTER COLUMN "note" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "lightnovel_chapter" ALTER COLUMN "content" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "lightnovel_volume" ALTER COLUMN "image" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "lightnovel_volume" ALTER COLUMN "image" SET DEFAULT '{"key":"","url":""}'::jsonb;--> statement-breakpoint
ALTER TABLE "manga" ALTER COLUMN "other_names" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "manga" ALTER COLUMN "other_names" SET DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "manga" ALTER COLUMN "summary" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "manga" ALTER COLUMN "note" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "manga_chapter" ALTER COLUMN "content" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "manga_chapter" ALTER COLUMN "content" SET DEFAULT '{"key":"","url":""}'::jsonb;--> statement-breakpoint
ALTER TABLE "manga_chapter" ALTER COLUMN "thumbnail" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "manga_chapter" ALTER COLUMN "thumbnail" SET DEFAULT '{"key":"","url":""}'::jsonb;--> statement-breakpoint
ALTER TABLE "manga_season" ALTER COLUMN "image" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "manga_season" ALTER COLUMN "image" SET DEFAULT '{"key":"","url":""}'::jsonb;--> statement-breakpoint
ALTER TABLE "manga_season" ALTER COLUMN "musics" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "manga_season" ALTER COLUMN "musics" SET DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "translation_group" ALTER COLUMN "description" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "translation_group" ALTER COLUMN "image" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "translation_group" ALTER COLUMN "image" SET DEFAULT '{"key":"","url":""}'::jsonb;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "description" SET DATA TYPE jsonb;