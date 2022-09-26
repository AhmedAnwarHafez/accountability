// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { studentsRouter } from './students'
import { attendanceReporter } from './report'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('students.', studentsRouter)
  .merge('attendance.', attendanceReporter)

// export type definition of API
export type AppRouter = typeof appRouter
