import { auth } from "@/auth";
import { StartPostForm } from "@/components/forms/start-post-form";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return null;
  }

  return (
    <>
      <h1 className={"text-4xl font-bold mx-[10%] py-8"}>
        Share your thoughts...
      </h1>
      <StartPostForm authorId={session.user.id} />
    </>
  );
}
