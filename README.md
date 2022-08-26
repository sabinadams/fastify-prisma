## Prisma + Fastify

![Header](https://user-images.githubusercontent.com/18456526/186809677-11818965-2870-4912-b4b9-5bbcebd9b270.png)

<div align=center>

[![npm version](https://badge.fury.io/js/@sabinthedev%2Ffastify-prisma.svg)](https://badge.fury.io/js/@sabinthedev%2Ffastify-prisma)
[![Tests/Linting](https://github.com/sabinadams/fastify-prisma/actions/workflows/checks.yml/badge.svg)](https://github.com/sabinadams/fastify-prisma/actions/workflows/checks.yml)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![NPM](https://nodei.co/npm/@sabinthedev/fastify-prisma.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@sabinthedev/fastify-prisma)

</div>

## Installation

To use this package, first install it:

```sh
npm i @sabinthedev/fastify-prisma
```

## Usage

In order to use this package, you will need [Prisma](https://www.prisma.io/) set up in your project and [Prisma Client](https://www.prisma.io/client) generated. This plugin currently relies on Prisma Client being in `node_modules/@prisma/client`, (the default output location of the generated client).

```ts
import prismaPlugin from '@sabinthedev/fastify-prisma'
import Fastify from 'fastify'

const fastify = Fastify()

fastify.register(prismaPlugin)

fastify.get('/', async () => {
  // You will get nice intellisense here 👇🏻
  const users = await fastify.prisma.user.findMany()
  return { users }
})

fastify.listen({ port: 3000 }, (err, address) => {
  console.info(`⚡️ Server running at ${address}`)
})
```

You can also provide an object that contains Prisma Client's [constructor arguments](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#prismaclient). For example, if you would like to manually set the datasource:

```ts

fastify.register(prismaPlugin, {
  datasources: {
    db: {
      url: 'file:./dev.db'
    }
  }
})

```
## Caveats

There are a few caveats with this plugin which, at the moment, have no workarounds I am aware of:

### Can't use a custom output directory for Prisma Client

In Prisma, you have the ability via the Prisma schema to change the output directory of the generated client, which defaults to `node_modules/@prisma/client`. 

This plugin, however, relies on that client being in the default location.

### Only a single Prisma Client can be used

You can set up different schemas in Prisma and generate Prisma Client for each schema. This requires using custom outputs, which is not supported in this plugin for the reason detailed above.

### Prisma Client options may result in unexpected problems with typings & intellisense

Because the plugin has to look in the `node_modules` directory for Prisma Client and registers the `prisma` decorator with the type `PrismaClient`, certain actions that adjust the type of `PrismaClient` will not register correctly in the Fastify instance.

For example, while configuring logging in PrismaClient:

```ts
const prisma = new PrismaClient({
  log: [{ emit: 'event', level: 'info' }]
})
```

This will actually adjust the `PrismaClient` type and give you the ability to hook into events:

```ts
prisma.$on('info', (e) => {
  console.log(e)
})
```

Passing those logging configurations with this plugin will not adjust the type of the `prisma` decorator on the Fastify instance, resulting in a type error if you attempt to use the code above. 

Just to clarify, <ins>this will affect any operation that adjusts the Prisma Client type</ins>.

## Author
I'm Sabin Adams!

<p align="left"> <a href="https://twitter.com/sabinthedev" target="blank"><img src="https://img.shields.io/twitter/follow/sabinthedev?logo=twitter&style=for-the-badge" alt="sabinthedev" /></a> </p>

## Contributors

None yet! But contributions are welcome!

## License

Licensed under [MIT](./LICENSE).
