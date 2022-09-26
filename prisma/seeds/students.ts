import { PrismaClient } from '@prisma/client'
import students from '../data/students'
import cohorts from '../data/cohorts'

const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.attendances.deleteMany()
    await prisma.cohorts.deleteMany()

    cohorts.forEach(async (cohort) => {
      await prisma.cohorts.create({
        data: cohort,
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
