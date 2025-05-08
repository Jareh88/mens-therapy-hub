// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "@/collections/Users";
import { Media } from "@/collections/Media";
import { Pages } from "@/collections/Pages";
import { Therapists } from "@/collections/Therapists";
import { plugins } from "./plugins";
import { Resources } from "./collections/Resources";
import { Categories } from "./collections/Categories";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  email: nodemailerAdapter(), // Dev testing
  // @TODO set up production email
  // email: nodemailerAdapter({
  //   defaultFromAddress: "info@mth.co.uk",
  //   defaultFromName: "Men's Therapy Hub",
  //   // Nodemailer transportOptions
  //   transportOptions: {
  //     host: process.env.SMTP_HOST,
  //     port: 587,
  //     auth: {
  //       user: process.env.SMTP_USER,
  //       pass: process.env.SMTP_PASS,
  //     },
  //   },
  // }),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  serverURL: process.env.PAYLOAD_PUBLIC_URL || "http://localhost:3000",
  collections: [Pages, Therapists, Users, Media, Resources, Categories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    ...plugins,
  ],
});
