import { PostCardList } from "@/components/post-card-list";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div
      key="1"
      className="flex flex-col gap-6 px-4 py-6 md:px-6 lg:py-16 md:py-12"
    >
      <h1 className="text-4xl font-bold">Programming Blog Feed</h1>
      <div className="grid grid-cols-1 gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          <PostCardList />
        </Suspense>
      </div>
    </div>
  );
}
