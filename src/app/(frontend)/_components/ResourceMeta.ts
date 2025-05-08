import type { Metadata } from "next";
import { generateMeta } from "@frontend/_utils/generateMeta";

const staticMap = {
  therapists: {
    meta: {
      title: "Male Therapists & Counsellors Near You | Men's Therapy Hub",
      description:
        "Get matched to a qualified professional near you. Male therapists and counsellors specialising in men's mental health, couples therapy, and more.",
    },
    slug: "therapists",
  },
  articles: {
    meta: {
      title: "Advice for Men, By Men | Articles",
      description: "Professional articles focused on men’s mental health.",
    },
    slug: "articles",
  },
  "getting-started": {
    meta: {
      title: "Getting Started in Therapy | Men’s Therapy Hub",
      description: "Practical guidance for beginning your therapy journey.",
    },
    slug: "getting-started",
  },
  "common-therapy-topics": {
    meta: {
      title: "Common Therapy Topics | Men’s Therapy Hub",
      description:
        "Deep dives into issues men frequently bring to counselling.",
    },
    slug: "common-therapy-topics",
  },
};

type ResourceType = keyof typeof staticMap;

export function makeIndexMetadata(type: ResourceType): () => Promise<Metadata> {
  return async function generateMetadata(): Promise<Metadata> {
    // Static title/description per type, this is where static page SEO data is set

    return generateMeta({ doc: staticMap[type] });
  };
}
