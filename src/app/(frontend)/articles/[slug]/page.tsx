import { Metadata } from "next";
import ResourceView from "../../_components/ResourceView";
import { PageArgs } from "../../_lib/pageArgs";
import { getPayloadInstance } from "../../_lib/payload";
import { generateMeta } from "../../_utils/generateMeta";
import type { Page, Resource } from "@/payload-types";

export async function generateStaticParams() {
  const payload = await getPayloadInstance();

  const { docs: resources } = await payload.find({
    collection: "resources",
    where: { type: { equals: "articles" } },
    pagination: false,
  });

  const params = resources.map((doc) => ({
    slug: doc.slug,
  }));

  return params;
}

export default async function Page({ params: paramsPromise }: PageArgs) {
  const { slug = "" } = await paramsPromise;

  return <ResourceView slug={slug} />;
}

export async function generateMetadata({
  params: paramsPromise,
}: PageArgs): Promise<Metadata> {
  const { slug } = await paramsPromise;
  const payload = await getPayloadInstance();

  const { docs: [resource] = [] } = await payload.find({
    collection: "resources",
    where: {
      slug: {
        equals: slug,
      },
      type: { equals: "articles" },
    },
    limit: 1,
  });

  const page = {
    meta: {
      title: resource?.meta?.title || "Articles | Men's Therapy Hub",
      description: resource?.meta?.description || "",
    },
    slug: ["/articles", `${resource.slug}`],
  };

  return generateMeta({
    doc: page as unknown as Partial<Page> | Partial<Resource>,
  });
}
