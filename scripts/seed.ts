import {NewPost, insertPost, NewUser, insertUser } from "@/lib/db";

const featuredPosts: NewPost[] = [
  {
    title: "The Art of Storytelling",
    description: "Discover the secrets behind creating compelling narratives that capture the imagination."
  },
  {
    title: "Understanding Character Development",
    description: "Dive into the complex world of character development and learn how to create memorable characters."
  },
  {
    title: "The Power of Visual Storytelling",
    description: "Explore how visual elements can enhance storytelling and engage audiences in unique ways."
  }
];

const testUsers = [{
  name: "John Smith",
  email: "johnsmith@gmail.com",
  password: "password",
}]

async function main() {
  await Promise.all(featuredPosts.map(insertPost)).then(() => {
    console.log("Successfully inserted featured posts.");
  }).catch((error) => {
    console.error("Error inserting featured posts:", error);
  });

  await Promise.all(testUsers.map(insertUser)).then(() => {
    console.log("Successfully inserted test users.");
  }).catch((error) => {
    console.error("Error inserting test users:", error);
  });

  process.exit(0);
}

main();