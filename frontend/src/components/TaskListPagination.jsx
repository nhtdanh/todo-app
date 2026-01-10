import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
const TaskListPagination = ({
  handleNext,
  handlePrev,
  handlePageChanged,
  page,
  totalPages,
}) => {
  // Không render khi totalPage = 0 nhưng cần chỉnh lại css
  // if (totalPages === 0) return null; 
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages || totalPages <= 1;
  const generatePages = () => {
    const pages = [];
    if (totalPages < 4) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page < 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 1) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page, "...", totalPages);
      }
    }
    return pages;
  };
  const pagesToShow = generatePages();
  return (
    <div className="flex justify-center mt-4">
      {" "}
      <Pagination>
        <PaginationContent>
          {/* Prvious */}
          <PaginationItem>
            <PaginationPrevious
              onClick={page === 1 ? undefined : handlePrev}
              className={cn(
                "cursor-pointer",
                isPrevDisabled && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
          {pagesToShow.map((p, index) => (
            <PaginationItem key={index}>
              {p === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={p === page}
                  onClick={() => {
                    if (p !== page) handlePageChanged(p);
                  }}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={page === totalPages ? undefined : handleNext}
              className={cn(
                "cursor-pointer",
                isNextDisabled && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TaskListPagination;
