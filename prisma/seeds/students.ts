import { PrismaClient } from '@prisma/client'
import students from '../data/students'
import cohorts from '../data/cohorts'

const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.attendances.deleteMany()
    await prisma.students.deleteMany()
    await prisma.cohorts.deleteMany()

    cohorts.forEach(async (cohort) => {
      await prisma.cohorts.create({
        data: cohort,
      })
    })

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
