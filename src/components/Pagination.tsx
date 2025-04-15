"use client";

import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  totalCount: number;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export function PaginationCustom({
  totalCount,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const [page, setPage] = useState(currentPage);
  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      onPageChange?.(newPage);
    }
  };

  // Генерация массива страниц для отображения
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Максимальное количество видимых страниц

    if (totalPages <= maxVisiblePages) {
      // Если общее количество страниц меньше или равно максимальному количеству видимых страниц
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Всегда показываем первую страницу
      pages.push(1);

      // Определяем начальную и конечную страницы для отображения
      let startPage = Math.max(2, page - 1);
      let endPage = Math.min(totalPages - 1, page + 1);

      // Если текущая страница близка к началу
      if (page <= 3) {
        startPage = 2;
        endPage = Math.min(4, totalPages - 1);
      }
      // Если текущая страница близка к концу
      else if (page >= totalPages - 2) {
        startPage = Math.max(totalPages - 3, 2);
        endPage = totalPages - 1;
      }

      // Добавляем эллипсис после первой страницы, если нужно
      if (startPage > 2) {
        pages.push("ellipsis1");
      }

      // Добавляем промежуточные страницы
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Добавляем эллипсис перед последней страницей, если нужно
      if (endPage < totalPages - 1) {
        pages.push("ellipsis2");
      }

      // Всегда показываем последнюю страницу
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(page - 1)}
            className={
              page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>

        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === "ellipsis1" || pageNumber === "ellipsis2") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => handlePageChange(pageNumber as number)}
                isActive={pageNumber === page}
                className="cursor-pointer"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(page + 1)}
            className={
              page === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
