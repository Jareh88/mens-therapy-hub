import { themeDeepBlue } from "@/app/constants";
import { Divider as MuiDivider, SxProps } from "@mui/material";

export default function DividerComponent({
  width,
  color = themeDeepBlue,
  sx = {},
}: {
  width: string;
  color?: string | null;
  sx?: SxProps | null;
}) {
  return (
    <MuiDivider
      sx={{
        opacity: 0.5,
        borderColor: color,
        borderStyle: "dashed",
        width: { width },
        mx: "auto",
        ...sx,
      }}
    />
  );
}
