import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

type BreadCrumbComponentProps = {
  parentUrl: string;
  title: string;
};

export default function Breadcrumb({
  parentUrl,
  title,
}: BreadCrumbComponentProps) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link href="/">
        <Typography
          sx={{ fontWeight: 400, "&:hover": { color: "primary.main" } }}
        >
          Home
        </Typography>
      </Link>
      <Link href={parentUrl}>
        <Typography
          sx={{ fontWeight: 400, "&:hover": { color: "primary.main" } }}
        >
          Therapists
        </Typography>
      </Link>
      <Typography sx={{ color: "primary.main", fontWeight: 700 }}>
        {title}
      </Typography>
    </Breadcrumbs>
  );
}
