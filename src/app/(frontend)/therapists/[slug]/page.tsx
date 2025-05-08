import { Container, Typography } from "@mui/material";
import TherapistProfile from "@/app/(frontend)/_components/TherapistProfile";
// import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import Link from "next/link";
import { getPayloadInstance } from "@frontend/_lib/payload";
import { notFound } from "next/navigation";
import { generateMeta } from "../../_utils/generateMeta";
import { PageArgs } from "../../_lib/pageArgs";
import { Metadata } from "next";
import type { Page, Resource } from "@/payload-types";

export async function generateStaticParams() {
  const payload = await getPayloadInstance();

  const { docs: therapists } = await payload.find({
    collection: "therapists",
    pagination: false,
    select: { slug: true },
  });

  const params = therapists.map((doc) => ({
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

  const { docs: [therapist] = [] } = await payload.find({
    collection: "therapists",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  if (!therapist) {
    return notFound();
  }

  return (
    // TODO: put padding on container as default
    <Container sx={{ py: { xs: 0, lg: 6 } }}>
      {/* <BreadcrumbComponent parentUrl="/therapists" title={therapist.name} /> */}
      <Link href="/therapists">
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ "&:hover": { color: "primary.main" } }}
          mb={2}
        >
          {"«"} Back to your search
        </Typography>
      </Link>
      <TherapistProfile therapist={therapist} />
    </Container>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: PageArgs): Promise<Metadata> {
  const { slug } = await paramsPromise;
  const payload = await getPayloadInstance();

  const { docs: [therapist] = [] } = await payload.find({
    collection: "therapists",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  const page = {
    meta: {
      title: `${therapist.name} | Men's Therapy Hub`,
      description: `Qualified male ${therapist.profession}`,
    },
    slug: ["/therapists", `${therapist.slug}`],
  };

  return generateMeta({
    doc: page as unknown as Partial<Page> | Partial<Resource>,
  });
}
