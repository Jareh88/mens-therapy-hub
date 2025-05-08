import Grid from "@mui/material/Grid2";
import TherapistCard from "@/app/(frontend)/_components/TherapistCard";
import { Container, Typography } from "@mui/material";
import GetMatchedFilters from "@/app/(frontend)/_components/GetMatchedFilters";
import { Suspense } from "react";
import HowToComponent from "@/app/(frontend)/_components/HowTo";
import SearchQueryEdit from "@frontend/_components/SearchQueryEdit";
import { getPayloadInstance } from "@frontend/_lib/payload";
import { makeIndexMetadata } from "../_components/ResourceMeta";
import {
  filterFromSearch,
  whereFromFilter,
} from "../_components/filter/filterQuery";
import FilterProvider from "../_components/filter/FilterProvider";

type Search = {
  communication_method?: "online" | "in-person" | "phone" | "home"[];
  ethnicity?: string;
  max?: string;
  min?: string;
  specialisms?: string[];
  age?: string;
  typesOfTherapy?: string[];
  therapistEthnicity?: string;
  preferredLanguage?: string;
};

export default async function Therapists({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = new URLSearchParams(
    (await searchParamsPromise) as URLSearchParams
  );
  const filter = filterFromSearch(sp);
  const where = whereFromFilter(filter);

  const payload = await getPayloadInstance();
  const { docs: therapists } = await payload.find({
    collection: "therapists",
    where,
    limit: 20,
    sort: "name",
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FilterProvider initial={filter} total={therapists.length}>
        <SearchQueryEdit />
        <Container sx={{ py: { xs: 0, lg: 6 } }}>
          <Grid container spacing={2} mb={2} sx={{ justifyContent: "center" }}>
            <Grid
              size={{ xs: 12, lg: 2 }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <HowToComponent />
            </Grid>
            <Grid size={{ xs: 12, sm: 8, lg: 8 }}>
              <Typography
                variant="h1"
                component="h2"
                color="text.secondary"
                mb={2}
                sx={{ textAlign: { xs: "left", lg: "center" } }}
              >
                Choose your therapist:
              </Typography>
              <Typography
                variant="h3"
                color="text.secondary"
                mb={2}
                sx={{ textAlign: { xs: "left", lg: "center" } }}
              >
                Success in therapy starts with choosing the right therapist.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: { xs: "left", lg: "center" } }}
                mb={4}
              >
                You can always go with your gut, or try our &quot;get
                matched&quot; tool to narrow down your options.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 4, lg: 2 }}>
              <GetMatchedFilters />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            {therapists?.length ? (
              therapists.map((therapist, index) => (
                <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
                  <TherapistCard therapist={therapist} />
                </Grid>
              ))
            ) : (
              <p>No therapists found.</p>
            )}
          </Grid>
        </Container>
      </FilterProvider>
    </Suspense>
  );
}

export const generateMetadata = makeIndexMetadata("therapists");
