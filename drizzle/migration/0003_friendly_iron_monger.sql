ALTER TABLE "reply" ALTER COLUMN "reply_to" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comment" ADD COLUMN "parent_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reply" ADD CONSTRAINT "reply_reply_to_comment_id_fk" FOREIGN KEY ("reply_to") REFERENCES "comment"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
