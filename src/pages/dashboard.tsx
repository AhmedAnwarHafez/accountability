import type { NextPage } from 'next'
import { useState } from 'react'

import { trpc } from '../utils/trpc'
import Cohorts from './components/Cohorts'

const date = new Date(Date.now() - 5 * 60 * 60 * 1000)

const Dashboard: NextPage = () => {
  const [cohort, setCohort] = useState(0)

  const cohortsQuery = trpc.useQuery(['students.getCohorts'])
  const attendanceQuery = trpc.useQuery([
    'attendance.getAttendance',
    { cohortId: cohort, date },
  ])

  const handleCohort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCohort(+e.target.value)
  }
  return (
    <main className="flex flex-col gap-4 fixed items-center justify-center w-full h-full bg-softblue text-ultraviolet font-semibold text-3xl tracking-widest">
      {cohortsQuery.data && (
        <Cohorts cohorts={cohortsQuery.data} handleCohort={handleCohort} />
      )}
      <ul>
        {!attendanceQuery.isLoading &&
          attendanceQuery.data?.map((student) => (
            <li key={student.id}>
              <p>{student.name}</p>
              <p>{student.inTheSpace}</p>
            </li>
          ))}
      </ul>
    </main>
  )
}

export default Dashboard
