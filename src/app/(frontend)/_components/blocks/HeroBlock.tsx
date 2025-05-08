import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { HomeForm } from "../HomeForm";
import { themeWhite } from "@/app/constants";

export interface HeroBlockProps {
  heading: string;
  paragraph: string;
  subheading?: string | null;
  id?: string | null;
}

export const HeroBlock: React.FC<HeroBlockProps> = ({
  heading,
  subheading,
  paragraph,
  id,
}) => {
  return (
    <Container
      sx={{ mb: { lg: 6 }, pt: { xs: 0, lg: 6 } }}
      key={id}
      data-testid="hero-block"
    >
      <Grid container spacing={8} sx={{ minHeight: "479px" }}>
        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
          <HomeForm />
        </Grid>
        <Grid
          size={{ xs: 12, md: 6, lg: 7 }}
          sx={{
            alignContent: "center",
            mb: 6,
          }}
        >
          {heading && (
            <Typography
              variant="h1"
              component="h2"
              color="primary.dark"
              sx={{ textAlign: "center" }}
            >
              {heading}
            </Typography>
          )}
          {subheading && (
            <Typography
              variant="h2"
              component="h2"
              color="primary.dark"
              sx={{ textAlign: "center", mb: 2, fontSize: { md: "38px" } }}
            >
              {subheading}
            </Typography>
          )}
          {paragraph && (
            <Typography
              variant="body1"
              sx={{ color: themeWhite, fontSize: { md: "1.27rem" } }}
            >
              {paragraph}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
