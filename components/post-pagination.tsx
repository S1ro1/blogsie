"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type PostPaginationProps = {
  totalPages: number;
  currentPage: number;
};

export function PostPagination({
  totalPages,
  currentPage,
}: PostPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const selectedPages = pages.filter((page) => {
    return Math.abs(page - currentPage) <= 1 && page != totalPages && page != 1;
  });

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            href={{
              pathname: "/blog",
              query: { currentPage: currentPage - 1 },
            }}
          />
          <PaginationLink
            href={{
              pathname: "/blog",
              query: { currentPage: 1 },
            }}
            isActive={currentPage == 1}
          >
            1
          </PaginationLink>
          {currentPage > 3 && <PaginationEllipsis />}
          {selectedPages.map((page) => {
            return (
              <PaginationLink
                key={page}
                isActive={currentPage == page}
                href={{
                  pathname: "/blog",
                  query: { currentPage: page },
                }}
              >
                {page}
              </PaginationLink>
            );
          })}
          {currentPage < totalPages - 2 && <PaginationEllipsis />}
          <PaginationLink
            href={{
              pathname: "/blog",
              query: { currentPage: totalPages },
            }}
            isActive={currentPage == totalPages}
          >
            {totalPages}
          </PaginationLink>
          <PaginationNext
            href={{
              pathname: "/blog",
              query: { currentPage: currentPage + 1 },
            }}
          />
        </PaginationContent>
      </Pagination>
    </>
  );
}
