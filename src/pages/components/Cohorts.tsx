import { Cohorts } from '@prisma/client'
import type { NextPage } from 'next'

type Props = {
  cohorts: Cohorts[]
  handleCohort: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Cohorts: NextPage<Props> = ({ cohorts, handleCohort }) => {
  return (
    <select
      required
      name="cohort"
      id="cohort"
      onChange={handleCohort}
      className="w-64 px-2 text-slate-700 rounded-md focus:outline-yellow"
    >
      <option key={0} value="">
        Your cohort
      </option>
      {cohorts?.map((cohort) => (
        <option key={cohort.id} value={cohort.id}>
          {cohort.name}
        </option>
      ))}
    </select>
  )
}

export default Cohorts
