// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { studentsRouter } from './students'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('students.', studentsRouter)

// export type definition of API
export type AppRouter = typeof appRouter
