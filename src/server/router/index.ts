// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { studentsRouter } from './students'
import { tokenRouter } from './token'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('students.', studentsRouter)
  .merge('token.', tokenRouter)

// export type definition of API
export type AppRouter = typeof appRouter
