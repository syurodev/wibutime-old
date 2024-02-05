ALTER TABLE "lightnovel_chapter" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "lightnovel_chapter" ADD COLUMN "viewed_at" timestamp;