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
const fastify_1 = __importDefault(require("fastify"));
const src_1 = __importDefault(require("../src"));
const fastify = (0, fastify_1.default)();
fastify.register(src_1.default);
fastify.get('/', () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fastify.prisma.user.count();
    return { count: data };
}));
fastify.listen({ port: 3000 }, (err, address) => {
    console.info(`⚡️ Server running at ${address}`);
});
