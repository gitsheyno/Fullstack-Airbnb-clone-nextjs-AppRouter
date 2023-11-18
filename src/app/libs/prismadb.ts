import { PrismaClient } from "@prisma/client";

//----------------------<< declaring globally >>----------------------
declare global {
  var prisma: PrismaClient | undefined;
}

//----------------------<< defining the client >>----------------------

const client = globalThis.prisma || new PrismaClient();
//----------------------<< globalthis prisma doesent effected by hot reload >>----------------------
if (process.env.NODE_ENV === "production") globalThis.prisma = client;

export default client;
