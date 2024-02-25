import { TagList } from "./tag-list";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface PostCardProps {
  title: string;
  description: string;

  firstName: string;
  lastName: string;
  email: string;
  tags: string[];
}

export function PostCard({
  title,
  description,
  firstName,
  lastName,
  email,
  tags,
}: PostCardProps) {
  const tagsToShow = tags.length > 3 ? tags.slice(0, 3) : tags;
  return (
    <Card key={title} className="h-[20vh]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {firstName ? firstName + " " + lastName : email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div className="text-sm mt-4">
            {description
              ? description.length > 200
                ? description.slice(0, 200) + "..."
                : description
              : ""}
          </div>
          <TagList tags={tagsToShow} />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Read More</Button>
      </CardFooter>
    </Card>
  );
}
