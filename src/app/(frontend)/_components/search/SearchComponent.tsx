"use client";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@frontend/_utils/useDebounce";

export const Search: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState("");
  const router = useRouter();

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ""}`);
  }, [debouncedValue, router]);

  return (
    <div>Search here</div>
    // <div>
    //   <form
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //     }}
    //   >
    //     {/* <Label htmlFor="search" className="sr-only">
    //       Search
    //     </Label>
    //     <Input
    //       id="search"
    //       onChange={(event) => {
    //         setValue(event.target.value);
    //       }}
    //       placeholder="Search"
    //     /> */}
    //     {/* @TODO search component */}
    //     <div>Search here</div>
    //     <button type="submit" className="sr-only">
    //       submit
    //     </button>
    //   </form>
    // </div>
  );
};
