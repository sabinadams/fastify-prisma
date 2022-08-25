import Fastify from 'fastify'
import prismaPlugin from '..'

const fastify = Fastify()

fastify.register(prismaPlugin)

fastify.get('/', async () => {
	const data = await fastify.prisma.user.findMany()
	return { count: data }
})

fastify.listen({ port: 3000 }, (err, address) => {
	console.info(`⚡️ Server running at ${address}`)
})