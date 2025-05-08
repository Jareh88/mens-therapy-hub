import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import { getPayloadInstance } from "../_lib/payload";
import RichText from "./RichText";
import { ImageWithPlaceholder } from "./ImageWithPlaceholder";
import { formatDate } from "../_utils/formatDate";
import type { Category, Media, User } from "@/payload-types";
import { themeWhite } from "@/app/constants";

type Props = { slug: string };

const isCategory = (c: Category | number): c is Category =>
  typeof c === "object" && c !== null;

const isUser = (u: User | number): u is User =>
  typeof u === "object" && u !== null;

export default async function ResourceView({ slug }: Props) {
  const payload = await getPayloadInstance();

  const { docs: [resource] = [] } = await payload.find({
    collection: "resources",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  if (!resource) return notFound();

  const categoryLabel = resource.categories
    ?.filter(isCategory)
    .map((c) => c.title)
    .join(", ");

  const authorLabel = resource.authors
    ?.filter(isUser)
    .map((a) => a.name)
    .join(", ");

  return (
    <Container sx={{ py: { xs: 0, lg: 6 } }}>
      <article>
        <Box color={themeWhite}>
          {categoryLabel && (
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.5, textTransform: "uppercase", mb: 1 }}
              color="primary"
            >
              {categoryLabel}
            </Typography>
          )}

          <Typography variant="h1" sx={{ mb: 2 }}>
            {resource.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{ lineHeight: 1.5, mb: 2 }}
            color="primary"
          >
            {authorLabel && `${authorLabel} on `}
            {formatDate(resource.publishedAt ?? "")}
          </Typography>
        </Box>

        <Card sx={{ p: 4 }}>
          <CardContent>
            {resource.heroImage && typeof resource.heroImage === "object" && (
              <Box
                sx={{
                  float: { xs: "initial", md: "left" },
                  mr: 4,
                  mb: 2,
                  mt: 1,
                }}
              >
                <ImageWithPlaceholder
                  imageObj={resource.heroImage as Media}
                  className="cover-img"
                  width={350}
                  height={350}
                />
              </Box>
            )}

            <RichText data={resource.content} />
          </CardContent>
        </Card>
      </article>
    </Container>
  );
}
