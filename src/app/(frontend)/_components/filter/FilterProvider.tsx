"use client";
import { createContext, useContext, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Filter, filterToSearch } from "./filterQuery";

type Ctx = {
  filter: Filter;
  update: (patch: Partial<Filter>) => void;
  total: number; // result count
};

const Ctx = createContext<Ctx | null>(null);
export const useFilter = () => useContext(Ctx)!;

export default function FilterProvider({
  initial,
  total,
  children,
}: {
  initial: Filter;
  total: number;
  children: React.ReactNode;
}) {
  const [filter, setFilter] = useState<Filter>(initial);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, start] = useTransition();
  const router = useRouter();

  const update = (patch: Partial<Filter>) => {
    const next = { ...filter, ...patch };
    setFilter(next);
    start(() => {
      router.replace(`/therapists?${filterToSearch(next)}`, { scroll: false });
    });
  };

  return (
    <Ctx.Provider value={{ filter, update, total }}>{children}</Ctx.Provider>
  );
}
