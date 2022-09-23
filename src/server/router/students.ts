import { createRouter } from './context'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const studentsRouter = createRouter()
  .mutation('attend', {
    input: z.object({
      name: z.string(),
      cohort: z.string().nullable(),
      token: z.string(),
    }),
    async resolve({ input }) {
      const { name, cohort } = input
      console.log({ name, cohort })

      // const studentId = input?.id
      // await prisma.attendances.create({
      //   data: {
      //     student_id: studentId,
      //   },
      // })
      return
    },
  })
  .query('getAll', {
    async resolve({ ctx }) {
      const token = jwt.sign({ foo: 'bar' }, 'secret', {
        expiresIn: 10,
      })
      return {
        token,
      }
    },
  })
