import Fastify from 'fastify'
import prismaPlugin from '../dist'

const fastify = Fastify()

fastify.register(prismaPlugin, {
  log: ['info'],
})

fastify.get('/', async () => {
  const users = await fastify.prisma.user.findMany()
  return { users }
})

fastify.listen({ port: 3000 }, async (err, address) => {
  console.info(`⚡️ Server running at ${address}`)
  await fastify.prisma.$on('info', (e) => console.log(e))
})
