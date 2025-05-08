import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Grid from "@mui/material/Grid2";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Link from "next/link";
import WorkingMethodComponent from "./WorkingMethod";
import { getExcerpt } from "../_helpers/getExcerpt";
import { ImageWithPlaceholder } from "./ImageWithPlaceholder";
import { Therapist } from "@/payload-types";
import { themeDeepBlue } from "@/app/constants";

export default function TherapistCard({ therapist }: { therapist: Therapist }) {
  return (
    <Card sx={{ height: "100%" }} className="therapist-card">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          p: 1,
        }}
      >
        <Link href={`/therapists/${therapist.slug}`}>
          <CardContent>
            {/* Name and meta info */}
            <Grid container spacing={1} sx={{ minHeight: "124px" }}>
              <Grid size={3}>
                <ImageWithPlaceholder
                  imageObj={therapist.photo}
                  className="profile-img"
                  width={100}
                  height={100}
                />
              </Grid>

              <Grid size={9} sx={{ mb: 1 }}>
                <Typography variant="h4" component="h3" align="center">
                  {therapist.name}
                </Typography>
                <Typography variant="body2" component="h4" align="center">
                  {therapist.profession}
                </Typography>

                <Box justifyItems={"center"} sx={{ lineHeight: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      lineHeight: 1,
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <WorkingMethodComponent
                      status={therapist.communication_method}
                    />
                  </Box>
                  {therapist.address && (
                    <Box className="flex-row">
                      <LocationOnOutlinedIcon />
                      <Typography variant="body2" component="h4" sx={{ pl: 1 }}>
                        {therapist.address}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>

            {/* Specialisms and bio */}
            <Box sx={{ minHeight: "58px" }}>
              <Typography variant="h6" component="h4" sx={{ lineHeight: 1.5 }}>
                Specialisms:
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                {therapist.specialisms.join(", ")}
              </Typography>
            </Box>
            <Divider
              sx={{
                opacity: 0.5,
                borderColor: themeDeepBlue,
                borderStyle: "dashed",
                mb: 2,
                width: "50%",
                mx: "auto",
              }}
            />
            <Typography
              variant="body1"
              // noWrap
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "4",
                WebkitBoxOrient: "vertical",
              }}
            >
              {getExcerpt(therapist.biography)}
            </Typography>
          </CardContent>
        </Link>
        <CardActions className="no-parent-hover">
          <Button variant="contained" href={`mailto:${therapist.email}`}>
            Email me
          </Button>
          <Link href={`/therapists/${therapist.slug}`}>
            <Button variant="contained" className="view-profile-btn">
              View Profile
            </Button>
          </Link>
          <Tooltip title="Bookmark">
            <IconButton disableRipple className="bookmark-btn">
              <BookmarkIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Box>
    </Card>
  );
}
