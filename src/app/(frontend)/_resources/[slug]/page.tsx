import { Box, Container } from "@mui/material";
import { getPayloadInstance } from "../../_lib/payload";
import { notFound } from "next/navigation";
import { PageArgs } from "../../_lib/pageArgs";
import { Metadata } from "next";
import { generateMeta } from "../../_utils/generateMeta";

export async function generateStaticParams() {
  const payload = await getPayloadInstance();

  const { docs: resources } = await payload.find({
    collection: "resources",
    pagination: false,
  });

  const params = resources.map((doc) => ({
    slug: doc.slug,
  }));

  return params;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await getPayloadInstance();

  const { docs: [resource] = [] } = await payload.find({
    collection: "resources",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  if (!resource) {
    return notFound();
  }

  return (
    <Container sx={{ py: { xs: 0, lg: 6 } }}>
      <Box>{resource.title}</Box>
    </Container>
  );
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
    },
    limit: 1,
  });

  return generateMeta({ doc: resource });
}
