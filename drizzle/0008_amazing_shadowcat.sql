ALTER TABLE "users" RENAME COLUMN "name" TO "first_name";--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "text" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" text;