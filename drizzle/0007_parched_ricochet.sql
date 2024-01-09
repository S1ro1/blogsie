CREATE TABLE IF NOT EXISTS "post_to_tags" (
	"post_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "post_to_tags_post_id_tag_id_pk" PRIMARY KEY("post_id","tag_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_to_tags" ADD CONSTRAINT "post_to_tags_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_to_tags" ADD CONSTRAINT "post_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
