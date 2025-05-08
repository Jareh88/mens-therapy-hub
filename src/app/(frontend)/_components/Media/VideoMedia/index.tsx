"use client";

import React, { useEffect, useRef } from "react";

import type { Props as MediaProps } from "../types";

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const { current: video } = videoRef;
    if (video) {
      video.addEventListener("suspend", () => {});
    }
  }, []);

  if (resource && typeof resource === "object") {
    const { url } = resource;
    const cacheTag = resource.updatedAt;

    return (
      <video
        className=""
        controls={true}
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
      >
        <source src={`${url}?${cacheTag}`} />
      </video>
    );
  }

  return null;
};
