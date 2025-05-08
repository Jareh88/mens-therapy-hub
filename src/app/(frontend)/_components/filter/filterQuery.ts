export type Filter = {
  communication?: string[];
  ethnicity?: string;
  price: [number, number];
  specialisms?: string[];
  age?: string[];
  therapyTypes?: string[];
  language?: string;
  address?: string;
};
interface RawParams {
  comm?: string;
  eth?: string;
  priceMin?: string;
  priceMax?: string;
  spec?: string;
  age?: string;
  tt?: string;
  lang?: string;
  address?: string;
}

export function filterFromSearch(sp: URLSearchParams): Filter {
  const json = Object.fromEntries(sp) as RawParams;

  const priceMin = json.priceMin ? Number(json.priceMin) : 40;
  const priceMax = json.priceMax ? Number(json.priceMax) : 200;

  return {
    communication: json.comm?.split(",").filter(Boolean) ?? [],
    ethnicity: json.eth,
    price: [priceMin, priceMax],
    specialisms: json.spec?.split(",").filter(Boolean) ?? [],
    age: json.age as Filter["age"] | undefined,
    therapyTypes: json.tt?.split(",").filter(Boolean) ?? [],
    language: json.lang,
    address: json.address,
  };
}

// Defaults & helpers

export const DEFAULT_FILTER: Filter = {
  communication: [],
  price: [40, 200],
  specialisms: [],
};

export const clearFilter = (): Filter => ({ ...DEFAULT_FILTER });

// Serialise & ready for router.replace()
export const filterToSearch = (f: Filter): URLSearchParams => {
  const sp = new URLSearchParams();

  if (f.communication?.length) sp.set("comm", f.communication.join(","));
  if (f.ethnicity && f.ethnicity === "Any") {
    sp.delete("eth");
  } else if (f.ethnicity) {
    sp.set("eth", f.ethnicity);
  }

  const [priceMin, priceMax] = f.price;
  if (f.price && f.price[0] && priceMin !== 40)
    sp.set("priceMin", String(priceMin));
  if (f.price && f.price[1] && priceMax !== 200)
    sp.set("priceMax", String(priceMax));

  if (f.specialisms?.length) sp.set("spec", f.specialisms.join(","));
  if (f.age) sp.set("age", f.age.join(","));
  if (f.therapyTypes?.length) sp.set("tt", f.therapyTypes.join(","));
  if (f.language) sp.set("lang", f.language);
  if (f.address) sp.set("address", f.address);

  return sp;
};

// Translate filter for payload where
// This is where to change the behaviour of the fetch.
// So if we want therapists to appear even when they are not matched but lower in the listing than matched ones it can be set here.
export function whereFromFilter(f: Filter) {
  const [min, max] = f.price;
  return {
    ...(f.communication?.length && {
      communication_method: { in: f.communication },
    }),
    ...(f.ethnicity && { ethnicity: { equals: f.ethnicity } }),
    ...((min !== 40 || max !== 200) && {
      fee_per_hour: {
        ...(min !== 40 && { greater_than_equal: min }),
        ...(max !== 200 && { less_than_equal: max }),
      },
    }),
    ...(f.specialisms?.length && { specialisms: { in: f.specialisms } }),
    ...(f.age && { ages_worked_with: { equals: f.age } }),
    ...(f.therapyTypes?.length && {
      therapy_types_offered: { in: f.therapyTypes },
    }),
    ...(f.language && { languages_spoken: { contains: f.language } }),
    ...(f.address && { address: { like: `%${f.address}%` } }),
  };
}
