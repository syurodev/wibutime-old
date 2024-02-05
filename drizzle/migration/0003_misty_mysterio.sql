ALTER TABLE "anime_season" ALTER COLUMN "broadcast_time" SET DATA TYPE time;--> statement-breakpoint
ALTER TABLE "reset_password_token" ALTER COLUMN "expires" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "verification_token" ALTER COLUMN "expires" SET DATA TYPE timestamp;