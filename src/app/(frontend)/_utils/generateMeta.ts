import type { Metadata } from "next";

import { mergeOpenGraph } from "./mergeOpenGraph";
import { getServerSideURL } from "./getURL";
import { Config, Media, Page, Resource } from "@/payload-types";

const getImageURL = (image?: Media | Config["db"]["defaultIDType"] | null) => {
  const serverUrl = getServerSideURL();

  let url = serverUrl + "/assets/og.svg";

  if (
    image &&
    typeof image === "object" &&
    "url" in image &&
    typeof image.url === "string"
  ) {
    // const ogUrl = image.sizes?.og?.url;
    // url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url;
    url = image.url;
  }

  return url;
};

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Resource> | null;
}): Promise<Metadata> => {
  const { doc } = args;

  const ogImage = getImageURL(doc?.meta?.image);

  const baseURL = getServerSideURL();

  const title = doc?.meta?.title ? doc?.meta?.title : "Men's Therapy Hub";

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || "",
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug)
        ? baseURL + doc?.slug.join("/")
        : `${baseURL}/${doc?.slug}`,
    }),
    title,
  };
};
