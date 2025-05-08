import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { ImageWithPlaceholder } from "./ImageWithPlaceholder";
import Grid from "@mui/material/Grid2";
import { formatDate } from "../_utils/formatDate";
import { getExcerpt } from "../_helpers/getExcerpt";
import { Resource } from "@/payload-types";

type ResourceCardProps = {
  resource: Resource;
  type: string;
};

export default function ResourceCard({ resource, type }: ResourceCardProps) {
  return (
    <Card className="resources-card" sx={{ mb: 2 }}>
      <Link href={`/${type}/${resource.slug}`}>
        <CardContent>
          <Grid
            container
            spacing={4}
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            {resource.heroImage && (
              <Grid
                size={{ xs: 12, sm: 5, md: 3 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ImageWithPlaceholder
                  imageObj={resource.heroImage}
                  className="cover-img"
                  width={180}
                  height={180}
                />
              </Grid>
            )}
            <Grid size={{ xs: 12, sm: 7, md: resource.heroImage ? 9 : 12 }}>
              <Typography
                variant="body2"
                sx={{ lineHeight: 1.5, textTransform: "uppercase", mb: 1 }}
              >
                {(resource.categories ?? [])
                  .map((cat) =>
                    typeof cat === "object" && cat !== null
                      ? cat.title
                      : undefined
                  )
                  .filter(Boolean)
                  .join(", ")}
              </Typography>
              <Typography variant="h2" component="h3">
                {resource.title}
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.5, mb: 2 }}>
                {resource.authors &&
                  resource.authors
                    .map((author) =>
                      typeof author === "object" && author !== null
                        ? author.name
                        : undefined
                    )
                    .join(", ")}{" "}
                on {formatDate(resource.publishedAt ?? "")}
              </Typography>
              <Typography>{getExcerpt(resource.content)}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Link>
    </Card>
  );
}
