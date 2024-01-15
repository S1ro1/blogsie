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
    <Card key={title}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <div className="flex justify-between">
            <p>{firstName ? firstName + " " + lastName : email}</p>
            <TagList tags={tagsToShow} />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mt-4">
          {description
            ? description.length > 200
              ? description.slice(0, 200) + "..."
              : description
            : ""}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Read More</Button>
      </CardFooter>
    </Card>
  );
}
