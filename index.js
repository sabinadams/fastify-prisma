'use strict'
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt (value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected (value) { try { step(generator.throw(value)) } catch (e) { reject(e) } }
    function step (result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const client_1 = require('@prisma/client')
const fastify_plugin_1 = __importDefault(require('fastify-plugin'))
const prismaPlugin = (fastify) => __awaiter(void 0, void 0, void 0, function * () {
  if (!client_1.PrismaClient) {
    throw new Error('`PrismaClient` not found. Please ensure you have generated Prisma Client using `npx prisma generate`')
  }
  if (!fastify.prisma) {
    const prisma = new client_1.PrismaClient()
    fastify.decorate('prisma', prisma)
    fastify.addHook('onClose', (server) => __awaiter(void 0, void 0, void 0, function * () {
      yield server.prisma.$disconnect()
    }))
  } else {
    throw new Error('The `prisma` decorator has already been registered.')
  }
})
exports.default = (0, fastify_plugin_1.default)(prismaPlugin)
