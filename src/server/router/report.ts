import { createRouter } from './context'
import { PrismaClient } from '@prisma/client'
import z from 'zod'
import moment from 'moment'

const prisma = new PrismaClient()

type Attendance = {
  id: number
  name: string
  attended: number
  attendedAt: number
}

export const attendanceReporter = createRouter().query('getAttendance', {
  input: z.object({
    date: z.date(),
    cohortId: z.number(),
  }),
  async resolve({ input }) {
    // const lastDay = new Date(Date.now() - 5 * 60 * 60 * 1000)
    const endOf = moment(input.date).endOf('day').valueOf()
    const startOf = moment(input.date).startOf('day').valueOf()

    const cohortId = input.cohortId
    const studentsInTheSpace = await prisma.$queryRaw<Attendance[]>`
    SELECT 
	s.id
	, s.name
	, CASE WHEN ${+startOf} < max(a.attended_at) < ${+endOf} THEN 1 ELSE 0 END as attended
  , max(a.attended_at) as attendedAt
from students as s 
LEFT OUTER join Attendances as a on s.id = a.student_id
where s.cohort_id = ${cohortId}
group by s.id
        `

    return studentsInTheSpace
  },
})
