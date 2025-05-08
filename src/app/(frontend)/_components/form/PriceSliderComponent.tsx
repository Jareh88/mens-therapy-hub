import { themeDeepBlue } from "@/app/constants";
import { Box, Slider, Typography } from "@mui/material";

export type PriceSliderProps = {
  passedValue: [number, number];
  onChange: (next: [number, number]) => void;
};

const marks = [
  {
    value: 40,
    label: "Under £40",
  },
  {
    value: 120,
    label: "£120",
  },
  {
    value: 200,
    label: "£200+",
  },
];

const label = (v: number) =>
  v === 40 ? "Under £40" : v === 200 ? "Over £200" : `£${v}`;

export const PriceSlider = ({ passedValue, onChange }: PriceSliderProps) => {
  return (
    <>
      <Box sx={{ width: "80%", mx: "auto" }}>
        <Slider
          aria-label="Custom marks"
          defaultValue={80}
          getAriaValueText={label}
          step={5}
          marks={marks}
          valueLabelDisplay="auto"
          valueLabelFormat={label}
          min={40}
          max={200}
          sx={{
            color: themeDeepBlue,
            height: "10px",
            mb: 4,
            "& .MuiSlider-markLabel": {
              color: "text.primary",
            },
          }}
          onChange={(e, v) => onChange(v as [number, number])}
          value={passedValue}
        />
      </Box>
      <Typography
        variant="body1"
        component="h5"
        sx={{ fontWeight: 400 }}
        mb={1}
      >{`Price Range: ${label(passedValue[0])} - ${label(
        passedValue[1]
      )}`}</Typography>
    </>
  );
};
