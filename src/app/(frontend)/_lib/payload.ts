"use server";

import { getPayload, Payload } from "payload";
import config from "@/payload.config";

let payloadInstance: Payload;

export async function getPayloadInstance() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config });
  }
  return payloadInstance;
}
