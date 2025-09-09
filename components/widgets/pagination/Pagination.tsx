"use client";

import { Button } from "@/components/ui/button";
import { useQueryParam } from "@/hooks/use-query-params";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { useCallback, useTransition } from "react";

type PaginationProps = {
  page: number;
  totalPages: number;
  urlParamName?: string;
};

const useParamNavigation = (
  page: number,
  totalPages: number,
  urlParamName: string
) => {
  const [isPending, startTransition] = useTransition();
  const { setQueryParam } = useQueryParam();

  const goToPage = useCallback(
    (nextPage: number) => {
      if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
      startTransition(() => {
        setQueryParam(urlParamName, String(nextPage));
      });
    },
    [page, totalPages, urlParamName, setQueryParam]
  );

  return { goToPage, isPending };
};

const Pagination = ({
  page,
  totalPages,
  urlParamName = "page",
}: PaginationProps) => {
  const { goToPage, isPending } = useParamNavigation(
    page,
    totalPages,
    urlParamName
  );

  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        disabled={Number(page) === 1 || isPending}
        onClick={() => goToPage(page - 1)}
        aria-label="Previous page"
      >
        {isPending ? <Loader className="animate-spin" /> : <ArrowLeft />}
        Previous
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        disabled={Number(page) >= totalPages || isPending}
        onClick={() => goToPage(page + 1)}
        aria-label="Next page"
      >
        {isPending ? <Loader className="animate-spin" /> : <ArrowRight />} Next
      </Button>
    </div>
  );
};

export default Pagination;
