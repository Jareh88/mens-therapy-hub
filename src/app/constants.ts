import { Metadata } from "next";
import { Roboto, Rubik } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const rubik = Rubik({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Men's Therapy Hub | Male Therapists For Men | Official Site",
  description:
    "Counsellors, psychotherapists, and support for men, by male therapists. Our directory helps match you to a qualified practitioner based on your needs.",
};

export const themeBlue = "#07a0c3";
export const themeDeepBlue = "#0A3449";
export const themeWhite = "#fbf8f3";
export const themeYellow = "#ff9900";
export const themeBrown = "#63372c";
