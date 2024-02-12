CREATE TABLE IF NOT EXISTS "account" (
	"userId" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anime" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"other_names" jsonb DEFAULT '[]'::jsonb,
	"summary" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"status" text,
	"note" jsonb,
	"user_id" uuid NOT NULL,
	"translation_group_id" uuid,
	CONSTRAINT "anime_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anime_episode" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" jsonb DEFAULT '{"key":"","url":""}'::jsonb NOT NULL,
	"thumbnail" jsonb DEFAULT '{"key":"","url":""}'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"viewed" integer DEFAULT 0,
	"index" varchar(6) NOT NULL,
	"viewed_at" timestamp,
	"season_id" uuid NOT NULL,
	CONSTRAINT "anime_episode_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "anime_season" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"image" jsonb DEFAULT '{"key":"","url":""}'::jsonb,
	"musics" jsonb DEFAULT '[]'::jsonb,
	"studio" text NOT NULL,
	"broadcast_time" timestamp NOT NULL,
	"broadcast_day" varchar(10) NOT NULL,
	"aired" date NOT NULL,
	"number_of_episodes" integer,
	"anime_id" uuid NOT NULL,
	CONSTRAINT "anime_season_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "category_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category_anime" (
	"category_id" uuid NOT NULL,
	"anime_id" uuid NOT NULL,
	CONSTRAINT "category_anime_category_id_anime_id_pk" PRIMARY KEY("category_id","anime_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category_lightnovel" (
	"category_id" uuid NOT NULL,
	"lightnovel_id" uuid NOT NULL,
	CONSTRAINT "category_lightnovel_category_id_lightnovel_id_pk" PRIMARY KEY("category_id","lightnovel_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category_manga" (
	"category_id" uuid NOT NULL,
	"manga_id" uuid NOT NULL,
	CONSTRAINT "category_manga_category_id_manga_id_pk" PRIMARY KEY("category_id","manga_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"comment" jsonb NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"reply" uuid,
	CONSTRAINT "comment_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment_anime" (
	"comment_id" uuid NOT NULL,
	"anime_id" uuid NOT NULL,
	CONSTRAINT "comment_anime_comment_id_anime_id_pk" PRIMARY KEY("comment_id","anime_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment_anime_episode" (
	"comment_id" uuid NOT NULL,
	"episode_id" uuid NOT NULL,
	CONSTRAINT "comment_anime_episode_comment_id_episode_id_pk" PRIMARY KEY("comment_id","episode_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment_lightnovel" (
	"comment_id" uuid NOT NULL,
	"lightnovel_id" uuid NOT NULL,
	CONSTRAINT "comment_lightnovel_comment_id_lightnovel_id_pk" PRIMARY KEY("comment_id","lightnovel_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment_lightnovel_chapter" (
	"comment_id" uuid NOT NULL,
	"chapter_id" uuid NOT NULL,
	CONSTRAINT "comment_lightnovel_chapter_comment_id_chapter_id_pk" PRIMARY KEY("comment_id","chapter_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment_manga" (
	"comment_id" uuid NOT NULL,
	"manga_id" uuid NOT NULL,
	CONSTRAINT "comment_manga_comment_id_manga_id_pk" PRIMARY KEY("comment_id","manga_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment_manga_chapter" (
	"comment_id" uuid NOT NULL,
	"chapter_id" uuid NOT NULL,
	CONSTRAINT "comment_manga_chapter_comment_id_chapter_id_pk" PRIMARY KEY("comment_id","chapter_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorite" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "favorite_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorite_anime" (
	"favorite_id" uuid NOT NULL,
	"anime_id" uuid NOT NULL,
	CONSTRAINT "favorite_anime_favorite_id_anime_id_pk" PRIMARY KEY("favorite_id","anime_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorite_lightnovel" (
	"favorite_id" uuid NOT NULL,
	"lightnovel_id" uuid NOT NULL,
	CONSTRAINT "favorite_lightnovel_favorite_id_lightnovel_id_pk" PRIMARY KEY("favorite_id","lightnovel_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorite_manga" (
	"favorite_id" uuid NOT NULL,
	"manga_id" uuid NOT NULL,
	CONSTRAINT "favorite_manga_favorite_id_manga_id_pk" PRIMARY KEY("favorite_id","manga_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "follower_group" (
	"follower_id" uuid NOT NULL,
	"followed_id" uuid NOT NULL,
	CONSTRAINT "follower_group_follower_id_followed_id_pk" PRIMARY KEY("follower_id","followed_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "follower_user" (
	"followed_by" uuid NOT NULL,
	"following" uuid NOT NULL,
	CONSTRAINT "follower_user_followed_by_following_pk" PRIMARY KEY("followed_by","following")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lightnovel" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"other_names" jsonb DEFAULT '[]'::jsonb,
	"author" varchar(70),
	"artist" varchar(70),
	"image" jsonb DEFAULT '{"key":"","url":""}'::jsonb,
	"summary" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"status" text,
	"note" jsonb,
	"user_id" uuid NOT NULL,
	"translation_group_id" uuid,
	CONSTRAINT "lightnovel_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lightnovel_chapter" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"content" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"viewed" integer DEFAULT 0,
	"words" integer DEFAULT 0,
	"viewed_at" timestamp,
	"volume_id" uuid NOT NULL,
	CONSTRAINT "lightnovel_chapter_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lightnovel_volume" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"image" jsonb DEFAULT '{"key":"","url":""}'::jsonb,
	"deleted" boolean DEFAULT false,
	"lightnovel_id" uuid NOT NULL,
	CONSTRAINT "lightnovel_volume_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manga" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"other_names" jsonb DEFAULT '[]'::jsonb,
	"summary" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"status" text,
	"note" jsonb,
	"user_id" uuid NOT NULL,
	"translation_group_id" uuid,
	CONSTRAINT "manga_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manga_chapter" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"content" jsonb DEFAULT '{"key":"","url":""}'::jsonb NOT NULL,
	"thumbnail" jsonb DEFAULT '{"key":"","url":""}'::jsonb NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"viewed" integer DEFAULT 0,
	"index" varchar(6),
	"season_id" uuid NOT NULL,
	CONSTRAINT "manga_chapter_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manga_season" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted" boolean DEFAULT false,
	"image" jsonb DEFAULT '{"key":"","url":""}'::jsonb,
	"musics" jsonb DEFAULT '[]'::jsonb,
	"studio" text NOT NULL,
	"broadcast_time" date NOT NULL,
	"broadcast_day" varchar(10) NOT NULL,
	"aired" date NOT NULL,
	"number_of_episodes" integer,
	"manga_id" uuid NOT NULL,
	CONSTRAINT "manga_season_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "permission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "permission_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "permission_role" (
	"role_id" uuid NOT NULL,
	"permission_id" uuid NOT NULL,
	CONSTRAINT "permission_role_role_id_permission_id_pk" PRIMARY KEY("role_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rating" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"user_id" uuid NOT NULL,
	"lightnovel_id" uuid,
	"anime_id" uuid,
	"manga_id" uuid,
	CONSTRAINT "rating_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reset_password_token" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "reset_password_token_id_unique" UNIQUE("id"),
	CONSTRAINT "reset_password_token_email_unique" UNIQUE("email"),
	CONSTRAINT "reset_password_token_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "role_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "translation_group" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" jsonb,
	"name" text NOT NULL,
	"image" jsonb DEFAULT '{"key":"","url":""}'::jsonb,
	"user_id" uuid,
	CONSTRAINT "translation_group_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "translation_group_members" (
	"user_id" uuid NOT NULL,
	"group_id" uuid NOT NULL,
	CONSTRAINT "translation_group_members_user_id_group_id_pk" PRIMARY KEY("user_id","group_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_roles" (
	"user_id" uuid NOT NULL,
	"role_id" uuid NOT NULL,
	CONSTRAINT "user_roles_user_id_role_id_pk" PRIMARY KEY("user_id","role_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"username" text,
	"image" text,
	"coins" integer DEFAULT 0,
	"image_key" text DEFAULT '',
	"description" jsonb,
	"email" text NOT NULL,
	"phone" text,
	"hashed_password" text,
	"emailVerified" boolean DEFAULT false,
	"phoneVerified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification_token" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verification_token_id_unique" UNIQUE("id"),
	CONSTRAINT "verification_token_email_unique" UNIQUE("email"),
	CONSTRAINT "verification_token_token_unique" UNIQUE("token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anime" ADD CONSTRAINT "anime_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anime" ADD CONSTRAINT "anime_translation_group_id_translation_group_id_fk" FOREIGN KEY ("translation_group_id") REFERENCES "translation_group"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anime_episode" ADD CONSTRAINT "anime_episode_season_id_anime_season_id_fk" FOREIGN KEY ("season_id") REFERENCES "anime_season"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "anime_season" ADD CONSTRAINT "anime_season_anime_id_anime_id_fk" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category_anime" ADD CONSTRAINT "category_anime_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category_anime" ADD CONSTRAINT "category_anime_anime_id_anime_id_fk" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category_lightnovel" ADD CONSTRAINT "category_lightnovel_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category_lightnovel" ADD CONSTRAINT "category_lightnovel_lightnovel_id_lightnovel_id_fk" FOREIGN KEY ("lightnovel_id") REFERENCES "lightnovel"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category_manga" ADD CONSTRAINT "category_manga_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "category_manga" ADD CONSTRAINT "category_manga_manga_id_manga_id_fk" FOREIGN KEY ("manga_id") REFERENCES "manga"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_anime" ADD CONSTRAINT "comment_anime_comment_id_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_anime" ADD CONSTRAINT "comment_anime_anime_id_anime_id_fk" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_anime_episode" ADD CONSTRAINT "comment_anime_episode_comment_id_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_anime_episode" ADD CONSTRAINT "comment_anime_episode_episode_id_anime_episode_id_fk" FOREIGN KEY ("episode_id") REFERENCES "anime_episode"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_lightnovel" ADD CONSTRAINT "comment_lightnovel_comment_id_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_lightnovel" ADD CONSTRAINT "comment_lightnovel_lightnovel_id_lightnovel_id_fk" FOREIGN KEY ("lightnovel_id") REFERENCES "lightnovel"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_lightnovel_chapter" ADD CONSTRAINT "comment_lightnovel_chapter_comment_id_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_lightnovel_chapter" ADD CONSTRAINT "comment_lightnovel_chapter_chapter_id_lightnovel_chapter_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "lightnovel_chapter"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_manga" ADD CONSTRAINT "comment_manga_comment_id_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_manga" ADD CONSTRAINT "comment_manga_manga_id_manga_id_fk" FOREIGN KEY ("manga_id") REFERENCES "manga"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_manga_chapter" ADD CONSTRAINT "comment_manga_chapter_comment_id_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_manga_chapter" ADD CONSTRAINT "comment_manga_chapter_chapter_id_manga_chapter_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "manga_chapter"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite" ADD CONSTRAINT "favorite_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite_anime" ADD CONSTRAINT "favorite_anime_favorite_id_favorite_id_fk" FOREIGN KEY ("favorite_id") REFERENCES "favorite"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite_anime" ADD CONSTRAINT "favorite_anime_anime_id_anime_id_fk" FOREIGN KEY ("anime_id") REFERENCES "anime"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite_lightnovel" ADD CONSTRAINT "favorite_lightnovel_favorite_id_favorite_id_fk" FOREIGN KEY ("favorite_id") REFERENCES "favorite"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite_lightnovel" ADD CONSTRAINT "favorite_lightnovel_lightnovel_id_lightnovel_id_fk" FOREIGN KEY ("lightnovel_id") REFERENCES "lightnovel"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite_manga" ADD CONSTRAINT "favorite_manga_favorite_id_favorite_id_fk" FOREIGN KEY ("favorite_id") REFERENCES "favorite"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite_manga" ADD CONSTRAINT "favorite_manga_manga_id_manga_id_fk" FOREIGN KEY ("manga_id") REFERENCES "manga"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follower_group" ADD CONSTRAINT "follower_group_follower_id_user_id_fk" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follower_group" ADD CONSTRAINT "follower_group_followed_id_translation_group_id_fk" FOREIGN KEY ("followed_id") REFERENCES "translation_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follower_user" ADD CONSTRAINT "follower_user_followed_by_user_id_fk" FOREIGN KEY ("followed_by") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follower_user" ADD CONSTRAINT "follower_user_following_user_id_fk" FOREIGN KEY ("following") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lightnovel" ADD CONSTRAINT "lightnovel_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lightnovel" ADD CONSTRAINT "lightnovel_translation_group_id_translation_group_id_fk" FOREIGN KEY ("translation_group_id") REFERENCES "translation_group"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lightnovel_chapter" ADD CONSTRAINT "lightnovel_chapter_volume_id_lightnovel_volume_id_fk" FOREIGN KEY ("volume_id") REFERENCES "lightnovel_volume"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lightnovel_volume" ADD CONSTRAINT "lightnovel_volume_lightnovel_id_lightnovel_id_fk" FOREIGN KEY ("lightnovel_id") REFERENCES "lightnovel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manga" ADD CONSTRAINT "manga_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manga" ADD CONSTRAINT "manga_translation_group_id_translation_group_id_fk" FOREIGN KEY ("translation_group_id") REFERENCES "translation_group"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manga_chapter" ADD CONSTRAINT "manga_chapter_season_id_manga_season_id_fk" FOREIGN KEY ("season_id") REFERENCES "manga_season"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manga_season" ADD CONSTRAINT "manga_season_manga_id_manga_id_fk" FOREIGN KEY ("manga_id") REFERENCES "manga"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "permission_role" ADD CONSTRAINT "permission_role_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "permission_role" ADD CONSTRAINT "permission_role_permission_id_permission_id_fk" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rating" ADD CONSTRAINT "rating_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "translation_group" ADD CONSTRAINT "translation_group_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "translation_group_members" ADD CONSTRAINT "translation_group_members_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "translation_group_members" ADD CONSTRAINT "translation_group_members_group_id_translation_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "translation_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;