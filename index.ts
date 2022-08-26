import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'
import { PrismaClientOptions } from '@prisma/client/runtime'

declare module 'fastify' {
	interface FastifyInstance {
		prisma: PrismaClient
	}
}

const prismaPlugin: FastifyPluginAsync<Omit<PrismaClientOptions, '__internal'>> = async (fastify, options) => {
	if (!fastify.hasDecorator('prisma')) {
		const prisma = new PrismaClient(options)
		await prisma.$connect()
		fastify
			.decorate('prisma', new PrismaClient(options))
			.addHook('onClose', async (server) => {
				await server.prisma.$disconnect()
			})
	} else {
		throw new Error('The `prisma` decorator has already been registered.')
	}
}

export default fp(prismaPlugin)
