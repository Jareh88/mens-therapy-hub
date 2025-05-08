"use client";
import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Box } from "@mui/material";

const StickyHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 140) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <Box className={`sticky-header ${isVisible ? "visible" : ""}`}>
      <Header isSticky={true} />
    </Box>
  );
};

export default StickyHeader;
