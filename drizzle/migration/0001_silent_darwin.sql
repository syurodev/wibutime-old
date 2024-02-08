ALTER TABLE "anime_episode" ALTER COLUMN "index" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "anime_episode" DROP COLUMN IF EXISTS "name";