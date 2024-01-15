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
}

export function PostCard({
  title,
  description,
  firstName,
  lastName,
  email,
}: PostCardProps) {
  return (
    <Card key={title}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {firstName + " " + lastName || email.split("@")[0]}
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
