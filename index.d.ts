/// <reference types="node" />
import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";
declare module "fastify" {
    interface FastifyInstance {
        prisma: PrismaClient;
    }
}
declare const _default: FastifyPluginAsync<Record<never, never>, import("http").Server, import("fastify").FastifyTypeProviderDefault>;
export default _default;
