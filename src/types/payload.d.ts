// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from "payload/auth";

declare module "payload/auth" {
  interface User {
    role?: "admin" | "therapist";
  }
}
