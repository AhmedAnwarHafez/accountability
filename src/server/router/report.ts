import { createRouter } from './context'
import { PrismaClient } from '@prisma/client'
import z from 'zod'

const prisma = new PrismaClient()

type Attendance = {
  id: number
  name: string
  attended: number
}

export const attendanceReporter = createRouter().query('getAttendance', {
  input: z.object({
    date: z.date(),
    cohortId: z.number(),
  }),
  async resolve({ input }) {
    // const lastDay = new Date(Date.now() - 5 * 60 * 60 * 1000)
    const date = input.date
    const cohortId = input.cohortId
    const studentsInTheSpace = await prisma.$queryRaw<Attendance[]>`
    SELECT 
	s.id
	, s.name
	, CASE WHEN max(a.attended_at) < ${+date} THEN 1 ELSE 0 END as attended
from students as s 
LEFT OUTER join Attendances as a on s.id = a.student_id
where s.cohort_id = ${cohortId}
group by s.id
        `

    return studentsInTheSpace
  },
})
