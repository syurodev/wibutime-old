ALTER TABLE "anime_episode" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "anime_episode" ADD COLUMN "viewed_at" timestamp;