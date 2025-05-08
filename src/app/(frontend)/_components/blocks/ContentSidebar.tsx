import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import ExtensionIcon from "@mui/icons-material/Extension";
import DividerComponent from "../Divider";
import { getPayloadInstance } from "@frontend/_lib/payload";
import TherapistCardComponent from "../TherapistCard";
import RichText from "../RichText";
import { SidebarContentBlockProps } from "./SidebarContent";
import { themeDeepBlue, themeYellow } from "@/app/constants";

export async function ContentSidebarBlock({
  heading,
  content,
  highlighted_therapist,
}: SidebarContentBlockProps) {
  const payload = await getPayloadInstance();

  const therapist = await payload.findByID({
    collection: "therapists",
    id: highlighted_therapist,
  });

  return (
    <>
      <Container sx={{ py: { xs: 0, lg: 6 } }}>
        <Grid container spacing={8}>
          <Grid
            size={{ xs: 12, lg: 8 }}
            sx={{
              color: "text.secondary",
              pr: { xs: 0, md: 8, lg: 8 },
              pl: { xs: 0, md: 8, lg: 0 },
            }}
          >
            <Typography variant="h1" component="h2" mb={4}>
              {heading}
            </Typography>
            {<RichText data={content} />}
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }} justifyItems="flex-end" sx={{ mb: 4 }}>
            <Box
              className="pulse"
              sx={{
                border: `2px solid ${themeYellow}`,
                p: 3,
                lineHeight: 1,
                transition: "all .2s ease-in-out",
                backgroundColor: themeYellow,
                color: themeDeepBlue,
                "&:hover": {
                  backgroundColor: "transparent",
                  color: themeYellow,
                  cursor: "pointer",
                },
                borderRadius: "4px",
                maxWidth: "178px",
                mb: 8,
              }}
            >
              <Link href="/therapists?openFilter=true">
                <Box className="pulse-delay" justifyItems="center">
                  <Box sx={{ fontSize: "62px" }}>
                    <ExtensionIcon fontSize="inherit" />
                  </Box>
                  <Box>
                    <Typography variant="h5">Get Matched</Typography>
                  </Box>
                </Box>
              </Link>
            </Box>
            <Box sx={{ width: "100%", color: "text.secondary" }}>
              <Typography
                variant="h5"
                component="h3"
                align="right"
                mb={2}
                sx={{ textDecoration: "underline" }}
              >
                One of our Partnered Specialists
              </Typography>
              <TherapistCardComponent therapist={therapist} />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <DividerComponent width="100%" color="text.secondary" sx={{ mb: 2 }} />
    </>
  );
}
