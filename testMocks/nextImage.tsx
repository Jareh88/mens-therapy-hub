import React, { type ComponentProps } from "react";
export function MockNextImage({
  priority,
  placeholder,
  blurDataURL,
  ...rest
}: ComponentProps<"img">) {
  return <img {...rest} />; // priority never reaches the DOM
}
export default MockNextImage;
