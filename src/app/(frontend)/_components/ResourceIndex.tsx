import { Container, Box, Typography } from "@mui/material";
import { getPayloadInstance } from "@frontend/_lib/payload";
import ResourceCard from "./ResourceCard";

export default async function ResourceIndex({
  type,
}: {
  type: "articles" | "getting-started" | "common-therapy-topics";
}) {
  const payload = await getPayloadInstance();

  const { docs: resources } = await payload.find({
    collection: "resources",
    where: { type: { equals: type } },
    sort: "title",
    limit: 100,
  });

  const titles = {
    articles: "Articles",
    "getting-started": "Getting Started",
    "common-therapy-topics": "Common Therapy Topics",
  };

  return (
    <Container sx={{ py: { xs: 0, lg: 6 } }}>
      <Typography
        variant="h1"
        component="h2"
        color="text.secondary"
        mb={4}
        sx={{ textAlign: { xs: "left", lg: "center" } }}
      >
        {titles[type]}
      </Typography>
      <Container maxWidth="md">
        {resources?.length ? (
          resources.map((r) => (
            <Box key={r.id}>
              <ResourceCard resource={r} type={type} />
            </Box>
          ))
        ) : (
          <p>No resources found.</p>
        )}
      </Container>
    </Container>
  );
}
