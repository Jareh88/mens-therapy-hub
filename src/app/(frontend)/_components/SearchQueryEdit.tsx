"use client";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchQueryEdit() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleUpdateParams = () => {
      const params = new URLSearchParams(searchParams);
      params.delete("openFilter");

      router.push(`${pathname}?${params.toString()}`);
    };
    handleUpdateParams();
  }, [pathname, router, searchParams]);

  return <></>;
}
