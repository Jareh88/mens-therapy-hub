import { Box } from "@mui/material";
import { getPayload } from "payload";
import config from "@/payload.config";
import { headers as getHeaders } from "next/headers.js";
import Image from "next/image";
import ThemeRegistry from "../(frontend)/_components/ThemeRegistry";
import { Header } from "../(frontend)/_components/Header";
import AdminBar from "../(frontend)/_components/AdminBar";
import StickyHeader from "../(frontend)/_components/StickyHeader";
import Footer from "../(frontend)/_components/Footer";
import AuthLayoutCard from "../(frontend)/_components/auth/AuthLayoutCard";
import { roboto, rubik } from "../constants";
import "../globals.css";
import "../responsive.css";

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });

  return (
    <html lang="en">
      <body className={`${rubik.variable} ${roboto.variable}`}>
        <ThemeRegistry>
          <Box
            sx={{
              bgcolor: "background.default",
              minHeight: "100vh",
              margin: user ? "58px 0 0 0" : 0,
              padding: 0,
            }}
          >
            <div className="background-image-container">
              <Image
                src="/assets/MTH - SVG transparent logo only.svg"
                alt="background-logo"
                fill
                priority
                className="background-image"
              />
            </div>
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              {user && <AdminBar user={user} />}
              <Header />
              <StickyHeader />
              <AuthLayoutCard>{children}</AuthLayoutCard>
              <Footer />
            </Box>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
