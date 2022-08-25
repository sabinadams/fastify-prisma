import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = async (fastify) => {
  if (!PrismaClient) {
    throw new Error(
      "`PrismaClient` not found. Please ensure you have generated Prisma Client using `npx prisma generate`"
    );
  }

  if (!fastify.prisma) {
    const prisma = new PrismaClient();
    fastify.decorate("prisma", prisma);
    fastify.addHook("onClose", async (server) => {
      await server.prisma.$disconnect();
    });
  } else {
    throw new Error("The `prisma` decorator has already been registered.");
  }
};

export default fp(prismaPlugin);
