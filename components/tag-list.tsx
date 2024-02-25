import { Badge } from "./ui/badge";

interface TagListProps {
  tags: string[];
}

export function TagList({ tags }: TagListProps) {
  return (
    <span className="flex gap-x-2 gap-y-2">
      {tags.map((tag) => {
        return <Badge key={tag} className="h-2/3 text-xs">{`#${tag}`}</Badge>;
      })}
    </span>
  );
}
