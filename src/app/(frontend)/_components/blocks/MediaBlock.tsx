import type { StaticImageData } from "next/image";

import React from "react";
import { Media as MediaComponent } from "../Media";

import type { Media, MediaBlock as MediaBlockProps } from "@/payload-types";

type Props = MediaBlockProps & {
  className?: string;
  staticImage?: StaticImageData;
  media: Media | number;
};

export const MediaBlock: React.FC<Props> = ({
  className,
  media,
  staticImage,
}) => {
  return (
    <div className={className ?? ""}>
      {(media || staticImage) && (
        <MediaComponent imgClassName="" resource={media} src={staticImage} />
      )}
    </div>
  );
};
