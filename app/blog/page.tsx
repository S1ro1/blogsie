import { PostCardList } from "@/components/post-card-list";
import { PostPagination } from "@/components/post-pagination";
import { getPostCount } from "@/lib/db";

export type Props = {
  searchParams: {
    currentPage: string | undefined;
  };
};

const PAGE_SIZE = 4;

export default async function Page({ searchParams }: Props) {
  const totalPages = Math.ceil((await getPostCount()) / PAGE_SIZE);
  const currentPage = searchParams.currentPage
    ? parseInt(searchParams.currentPage)
    : 1;

  return (
    <>
      <PostCardList currentPage={currentPage} />
      <PostPagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
