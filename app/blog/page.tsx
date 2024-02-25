import { PostCardList } from "@/components/post-card-list";
import { PostPagination } from "@/components/post-pagination";
import { getPostCount } from "@/lib/db";
import { postsPerPage } from "@/lib/consts";

export type Props = {
  searchParams: {
    currentPage: string | undefined;
  };
};

export default async function Page({ searchParams }: Props) {
  const totalPages = Math.ceil((await getPostCount()) / postsPerPage);
  const currentPage = searchParams.currentPage
    ? parseInt(searchParams.currentPage)
    : 1;

  return (
    <div className="flex flex-col space-y-5">
      <PostCardList currentPage={currentPage} />
      <PostPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
