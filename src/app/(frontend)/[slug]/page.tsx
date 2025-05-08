import type { Metadata } from "next";

import { PayloadRedirects } from "@frontend/_components/PayloadRedirects";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import React, { cache } from "react";
import { generateMeta } from "@frontend/_utils/generateMeta";
import { RenderBlocks } from "@frontend/_components/blocks/RenderBlocks";
import { LivePreviewListener } from "@frontend/_components/LivePreviewListener";
import { PageArgs } from "../_lib/pageArgs";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: "pages",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== "home";
    })
    .map(({ slug }) => {
      return { slug };
    });

  return params;
}

export default async function Page({ params: paramsPromise }: PageArgs) {
  const { isEnabled: draft } = await draftMode();
  const { slug = "" } = await paramsPromise;
  const url = "/" + slug;

  const slugToQuery = slug === "" ? "homepage" : slug;

  const page = await queryPageBySlug({ slug: slugToQuery });

  if (!page) {
    return <PayloadRedirects url={url} />;
  }

  const blocks = (page?.layout ?? []).filter(
    (b): b is NonNullable<typeof b> => !!b
  );

  return (
    <article className="pt-16 pb-24">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={blocks} />
    </article>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: PageArgs): Promise<Metadata> {
  const { slug = "homepage" } = await paramsPromise;
  const page = await queryPageBySlug({
    slug,
  });

  return generateMeta({ doc: page });
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: "pages",
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});
