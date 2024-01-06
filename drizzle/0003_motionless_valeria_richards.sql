ALTER TABLE "posts" ADD COLUMN "author_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "likes";