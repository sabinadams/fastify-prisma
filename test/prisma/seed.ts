import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main () {
	await prisma.user.deleteMany()
	await prisma.user.create({
		data: {
			age: 25,
			name: 'Sabin Adams'
		}
	})
	await prisma.user.create({
		data: {
			age: 23,
			name: 'Madeline Adams'
		}
	})
}

main()