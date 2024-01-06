CREATE TABLE IF NOT EXISTS "user_to_liked_posts" (
	"user_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	CONSTRAINT "user_to_liked_posts_user_id_post_id_pk" PRIMARY KEY("user_id","post_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_to_liked_posts" ADD CONSTRAINT "user_to_liked_posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_to_liked_posts" ADD CONSTRAINT "user_to_liked_posts_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
