import { createRouter } from './context'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

export const studentsRouter = createRouter()
  .mutation('attend', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const studentId = input?.id
      await prisma.attendances.create({
        data: {
          student_id: studentId,
        },
      })
      return
    },
  })
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.students.findMany()
    },
  })
