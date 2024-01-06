import {db, insertPost, insertUser, insertUserToLikedPost,} from "@/lib/db";
import {NewPost, NewUser, NewUserToLikedPost} from "@/lib/types";
import {usersToLikedPosts} from "@/lib/schema";
import {eq} from "drizzle-orm";

const posts: NewPost[] = [
  {
    id: 1,
    authorId: 1,
    title: "The Art of Storytelling",
    description: "Discover the secrets behind creating compelling narratives that capture the imagination."
  },
  {
    id: 2,
    authorId: 1,
    title: "Understanding Character Development",
    description: "Dive into the complex world of character development and learn how to create memorable characters."
  },
  {
    id: 4,
    authorId: 1,
    title: "The Power of Visual Storytelling",
    description: "Explore how visual elements can enhance storytelling and engage audiences in unique ways."
  }
];

const users: NewUser[] = [{
  id: 1,
  name: "John Smith",
  email: "johnsmith@gmail.com",
  password: "password",
}]

const likes: NewUserToLikedPost[] = [
  {
    userId: 1,
    postId: 1,
  },
  {
    userId: 1,
    postId: 2,
  },
]

async function main() {
  await Promise.all(users.map(insertUser)).then(() => {
    console.log("Successfully inserted test users.");
  }).catch((error) => {
    console.error("Error inserting test users:", error);
  });

  await Promise.all(posts.map(insertPost)).then(() => {
    console.log("Successfully inserted test posts.");
  }).catch((error) => {
    console.error("Error inserting test posts:", error);
  });

  await Promise.all(likes.map(insertUserToLikedPost)).then(() => {
    console.log("Successfully inserted test likes.");
  }).catch((error) => {
    console.error("Error inserting test likes:", error);
  });

  process.exit(0);
}

main();