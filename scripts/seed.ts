import {insertPost, insertPostToTag, insertTag, insertUser, insertUserToLikedPost} from "@/lib/db";
import {NewPost, NewPostToTag, NewTag, NewUser, NewUserToLikedPost} from "@/lib/types";

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
    description: "Explore how visual elements can enhance storytelling and engage audiences in unique ways.",
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

const tags: NewTag[] = [
  {
    id: 1,
    name: "Python",
  },
  {
    id: 2,
    name: "Java",
  },
  {
    id: 3,
    name: "Web Development",
  },
]

const postsToTags: NewPostToTag[] = [
  {
    postId: 1,
    tagId: 1,
  },
  {
    postId: 1,
    tagId: 2,
  },
  {
    postId: 1,
    tagId: 3,
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

  await Promise.all(tags.map(insertTag)).then(() => {
    console.log("Successfully inserted test tags.");
  }).catch((error) => {
    console.error("Error inserting test tags:", error);
  });

  await Promise.all(postsToTags.map(insertPostToTag)).then(() => {
    console.log("Successfully inserted test postsToTags.");
  }).catch((error) => {
    console.error("Error inserting test postsToTags:", error);
  })

  process.exit(0);
}

main();