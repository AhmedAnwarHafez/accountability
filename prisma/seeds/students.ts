import { PrismaClient } from '@prisma/client'
import students from '../data/students'

const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.students.deleteMany()

    students.forEach(async (student) => {
      await prisma.students.create({
        data: student,
      })
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
