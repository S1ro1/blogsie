import { Badge } from "./ui/badge";

interface TagListProps {
  tags: string[];
}

export function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2">
      {tags.map((tag) => (
        <Badge key={tag}>{`#${tag}`}</Badge>
      ))}
    </div>
  );
}
