import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.ts";

export const prisma = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
