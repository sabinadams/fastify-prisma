import { FastifyInstance } from 'fastify'
import { test } from 'tap'
import Fastify from 'fastify'
import prismaPlugin from '..'

type HelperCallback = {
	(
		error: Error,
		fastify: FastifyInstance
	): void
}

const register = (t: Tap.Test, callback: HelperCallback) => {
	const fastify = Fastify()
	t.teardown(() => fastify.close())
	fastify.register(prismaPlugin)
	fastify.ready((err) => callback(err, fastify))
}

const registerTwice = (t: Tap.Test, callback: HelperCallback) => {
	const fastify = Fastify()
	t.teardown(() => fastify.close())
	fastify.register(prismaPlugin)
	fastify.register(prismaPlugin)
	fastify.ready((err) => callback(err, fastify))
}

test('should register fastify.prisma', (t) => {
	t.plan(2)
	register(t, (err: Error, fastify: FastifyInstance) => {
		t.error(err)
		t.ok(fastify.prisma)
	})
})

test('fastify.prisma should hold Prisma Client functions', (t) => {
	t.plan(1)
	register(t, (_: Error, fastify: FastifyInstance) => {
		fastify.prisma.user.count()
			.then(() => t.pass())
			.catch(() => t.fail())
	})
})

test('fastify.prisma should fail if attempting to register more than once', (t) => {
	t.plan(2)
	registerTwice(t, (err: Error) => {
		t.ok(err)
		t.match(err.message, 'The `prisma` decorator has already been registered.')
	})
})
