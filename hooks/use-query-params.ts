"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useQueryParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const buildUrl = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  const setQueryParam = useCallback(
    (name: string, value: string, options?: { replace?: boolean }) => {
      const url = buildUrl(name, value);
      if (options?.replace) {
        router.replace(url);
      } else {
        router.push(url);
      }
    },
    [router, buildUrl]
  );

  return { setQueryParam, buildUrl };
};
