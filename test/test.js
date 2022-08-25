const test = require('tap').test
const register = require('./helpers').register
const registerNoClient = require('./helpers').registerNoClient
const registerTwice = require('./helpers').registerTwice

test('should register fastify.prisma', (t) => {
  t.plan(2)
  register(t, (err, fastify) => {
    t.error(err)
    t.ok(fastify.prisma)
  })
})

test('fastify.prisma should hold Prisma Client functions', (t) => {
  t.plan(1)
  register(t, (err, fastify) => {
    fastify.prisma.user.count().then(t.pass).catch(t.fail)
  })
})

test("fastify.prisma should fail if Prisma Client isn't available", (t) => {
  t.plan(2)

  registerNoClient(t, (err, fastify) => {
    t.ok(err)
    t.match(
      err.message,
      '`PrismaClient` not found. Please ensure you have generated Prisma Client using `npx prisma generate`'
    )
  })
})

test('fastify.prisma should fail if attempting to register more than once', (t) => {
  t.plan(2)
  registerTwice(t, (err, fastify) => {
    t.ok(err)
    t.match(err.message, 'The `prisma` decorator has already been registered.')
  })
})
