"use client";
import Image from "next/image";
import { imageLoader } from "../_helpers/imageLoader";
import type { Media } from "@/payload-types";

// runtime value to the generated `Media` type */
const isMedia = (m: unknown): m is Media =>
  typeof m === "object" && m !== null && "id" in m;

type ImageWithPlaceholderProps = {
  imageObj?: number | Media | null;
  className?: string;
  width?: number;
  height?: number;
};

export const ImageWithPlaceholder = ({
  imageObj,
  className = "",
  width = 80,
  height = 80,
}: ImageWithPlaceholderProps) => {
  // Render real image only when we have a populated doc and a URL
  if (isMedia(imageObj) && imageObj.url) {
    return (
      <Image
        loader={imageLoader}
        src={imageObj.url}
        width={width}
        height={height}
        alt={imageObj.alt ?? ""}
        className={className}
      />
    );
  }

  // Fallback
  return (
    <Image
      src={`https://place-hold.it/${width}x${height}`}
      width={width}
      height={height}
      alt="Placeholder"
      className={className}
    />
  );
};
