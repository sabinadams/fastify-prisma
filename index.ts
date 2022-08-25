import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const prismaPlugin: FastifyPluginAsync = async (fastify) => {
	if (!fastify.hasDecorator('prisma')) {
		fastify
			.decorate('prisma', new PrismaClient())
			.addHook('onClose', async (server) => {
				await server.prisma.$disconnect()
			})
	} else {
		throw new Error('The `prisma` decorator has already been registered.')
	}
}

export default fp(prismaPlugin)
