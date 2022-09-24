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
      token: z.string(),
    }),
    async resolve({ input }) {
      return await prisma.students.create({
        data: input,
      })
    },
  })
  .mutation('attend', {
    input: z.object({
      name: z.string(),
      cohort: z.number(),
      token: z.string(),
    }),
    async resolve({ input }) {
      const existingStudent = await prisma.students.findFirst({
        where: {
          cohort_id: input.cohort,
          name: input.name,
        },
      })

      if (existingStudent) {
        // student exists in db, a new attendance will be created then exit function
        await prisma.attendances.create({
          data: {
            student_id: existingStudent.id,
          },
        })
        return existingStudent.id
      } else {
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
      }
    },
  })
  .query('getCohorts', {
    async resolve({ ctx }) {
      return await prisma.cohorts.findMany()
    },
  })
