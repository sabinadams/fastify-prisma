import Fastify from 'fastify'
import prismaPlugin from '../dist'

const fastify = Fastify()

fastify.register(prismaPlugin)

fastify.get('/', async () => {
	const users = await fastify.prisma.user.findMany()
	return { users }
})

fastify.listen({ port: 3000 }, (err, address) => {
	console.info(`⚡️ Server running at ${address}`)
})