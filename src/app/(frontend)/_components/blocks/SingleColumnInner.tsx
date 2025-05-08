"use client";
import { Box, Button, Typography } from "@mui/material";
import DividerComponent from "../Divider";
import Image from "next/image";
import { imageLoader } from "../../_helpers/imageLoader";
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
import Link from "next/link";
import { Media } from "@/payload-types";
import { themeBlue, themeWhite } from "@/app/constants";

export interface SingleColumnInnerProps {
  title: string;
  paragraph: string;
  link?: string;
  icon?: Media | string | null;
}

const isMedia = (val: unknown): val is Media =>
  typeof val === "object" && val !== null && "url" in val;

export const SingleColumnInner: React.FC<SingleColumnInnerProps> = ({
  icon,
  link,
  title,
  paragraph,
}) => {
  return (
    <>
      {/* Icon of some kind */}
      {isMedia(icon) ? (
        <Box
          sx={{
            color: "text-secondary",
            display: "flex",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <Image
            loader={imageLoader}
            src={icon?.url ?? ""}
            width="80"
            height="80"
            alt={icon?.alt ?? ""}
          />
        </Box>
      ) : (
        <Box
          sx={{
            color: "text-secondary",
            display: "flex",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <Groups3OutlinedIcon sx={{ color: themeWhite, fontSize: "6rem" }} />
        </Box>
      )}
      <Box>
        {/* Title */}
        <Typography
          variant="h3"
          component="h3"
          color="text.secondary"
          align="center"
          mb={1}
        >
          {title}
        </Typography>
        <DividerComponent width="30%" color={themeWhite} sx={{ mb: 2 }} />
      </Box>
      <Box px={2}>
        {/* Para */}
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: { md: "1.27rem" }, mt: 3, mb: 4 }}
        >
          {paragraph}
        </Typography>
        {link && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Link href={link}>
              <Button variant="contained" sx={{ backgroundColor: themeBlue }}>
                Read more...
              </Button>
            </Link>
          </Box>
        )}
      </Box>
      <Box>{/* CTA */}</Box>
    </>
  );
};
