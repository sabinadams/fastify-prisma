const Fastify = require('fastify')
const prismaPlugin = require('..')
const mock = require('tap').mock

module.exports.register = (t, callback) => {
  const fastify = Fastify()
  t.teardown(() => fastify.close())
  fastify.register(prismaPlugin)
  fastify.ready((err) => callback(err, fastify))
}

module.exports.registerNoClient = (t, callback) => {
  const fastify = Fastify()
  t.teardown(() => fastify.close())
  const plugin = mock('..', {
    '@prisma/client': false
  })
  fastify.register(plugin)
  fastify.ready((err) => callback(err, fastify))
}

module.exports.registerTwice = (t, callback) => {
  const fastify = Fastify()
  t.teardown(() => fastify.close())
  fastify.register(prismaPlugin)
  fastify.register(prismaPlugin)
  fastify.ready((err) => callback(err, fastify))
}
