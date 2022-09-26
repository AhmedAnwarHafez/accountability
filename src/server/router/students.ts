import { createRouter } from './context'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

export const studentsRouter = createRouter()
  .mutation('new', {
    input: z.object({
      name: z.string(),
      cohort: z.number(),
      year: z.number(),
    }),
    async resolve({ input }) {
      return await prisma.students.create({
        data: input,
      })
    },
  })
  .mutation('attend.as.an.existing.student', {
    input: z.object({
      studentId: z.number(),
    }),
    async resolve({ input }) {
      await prisma.attendances.create({
        data: {
          student_id: input.studentId,
        },
      })
    },
  })
  .mutation('attend', {
    input: z.object({
      name: z.string(),
      cohort: z.number(),
    }),
    async resolve({ input }) {
      const student = await prisma.students.create({
        data: {
          name: input.name,
          cohort_id: input.cohort,
          year: new Date().getFullYear(),
        },
      })

      await prisma.attendances.create({
        data: {
          student_id: student.id,
        },
      })

      return student.id
    },
  })
  .query('getCohorts', {
    async resolve() {
      return await prisma.cohorts.findMany()
    },
  })
  .query('getStudent', {
    input: z.object({ studentId: z.number() }),
    async resolve({ input }) {
      return await prisma.students.findFirst({
        where: {
          id: input.studentId,
        },
      })
    },
  })
