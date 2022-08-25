"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const client_1 = require("@prisma/client");
const prismaPlugin = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fastify.hasDecorator('prisma')) {
        fastify
            .decorate('prisma', new client_1.PrismaClient())
            .addHook('onClose', (server) => __awaiter(void 0, void 0, void 0, function* () {
            yield server.prisma.$disconnect();
        }));
    }
    else {
        throw new Error('The `prisma` decorator has already been registered.');
    }
});
exports.default = (0, fastify_plugin_1.default)(prismaPlugin);
