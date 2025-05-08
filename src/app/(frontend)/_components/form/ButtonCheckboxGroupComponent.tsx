import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";

import Grid from "@mui/material/Grid2";
import { CheckboxButtonOptions } from "@frontend/_lib/types";
import { themeBlue, themeDeepBlue } from "@/app/constants";

type ButtonCheckboxGroupProps = {
  options: CheckboxButtonOptions;
  value: string[] | string;
  onChange: (next: string[]) => void;
  selectOne?: boolean;
  buttonSize?: "small" | "medium" | "large";
};

export default function ButtonCheckboxGroup({
  options,
  value,
  onChange,
  selectOne = false,
  buttonSize = "medium",
}: ButtonCheckboxGroupProps) {
  const handleOnChange = (
    _: React.MouseEvent<HTMLElement>,
    next: string[] | string
  ) => onChange(Array.isArray(next) ? next : [next]);

  return (
    <ToggleButtonGroup
      exclusive={selectOne}
      value={value}
      onChange={handleOnChange}
      aria-label="session type"
      fullWidth
    >
      <Grid container spacing={1} sx={{ width: "100%" }}>
        {options.map(({ label, icon }) => {
          return (
            <Grid size={3} key={label}>
              <ToggleButton
                value={label}
                size={buttonSize}
                disableRipple
                sx={{
                  width: "100%",
                  py: 1.5,
                  mr: 1,
                  p: buttonSize === "medium" || buttonSize === "large" ? 2 : 1,
                  textTransform: "none",
                  color: themeDeepBlue,
                  "& svg": {
                    fontSize: "22px",
                  },
                  "&.Mui-selected": {
                    bgcolor: "rgba(2,136,209,0.2)",
                    backgroundColor: "rgba(2, 136, 209, 0.2)",
                    fontWeight: 700,
                    borderColor: themeBlue,
                    "& p": {
                      fontWeight: 700,
                    },
                  },
                }}
              >
                {icon}
                <Typography
                  ml={1}
                  variant={
                    buttonSize === "medium" || buttonSize === "large"
                      ? "body1"
                      : "body2"
                  }
                >
                  {label}
                </Typography>
              </ToggleButton>
            </Grid>
          );
        })}
      </Grid>
    </ToggleButtonGroup>
  );
}
