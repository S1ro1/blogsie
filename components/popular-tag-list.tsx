"use server";
import { DefaultDict } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FetchPostsResultType } from "@/lib/types";

interface TagDisplayProps {
  posts: FetchPostsResultType;
}

const prepareTagCounts = (posts: FetchPostsResultType) => {
  const tagCounts = new DefaultDict<string, number>(() => 0);

  posts.forEach((post) => {
    post.postToTags.forEach((tag) => {
      tagCounts.set(tag.tag.name, tagCounts.get(tag.tag.name) + 1);
    });
  });

  return Array.from(tagCounts.entries()).sort((a, b) => {
    return b[1] - a[1];
  });
};

export const TagDisplay = ({ posts }: TagDisplayProps) => {
  const tagsArray = prepareTagCounts(posts);

  const tagBadges = tagsArray.map((tag) => {
    return (
      <Badge key={tag[0]} variant="secondary">
        #{tag[0]}
      </Badge>
    );
  });

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">Trending Tags</h2>
      <div className="flex flex-wrap gap-2 mt-4">{tagBadges}</div>
    </div>
  );
};
