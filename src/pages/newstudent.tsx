import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { trpc } from '../utils/trpc'
import Cohorts from './components/Cohorts'

const SignIn: NextPage = () => {
  const [form, setForm] = useState<FormType>({ name: '' })
  const router = useRouter()

  const { data } = trpc.useQuery(['students.getCohorts'])
  const mutation = trpc.useMutation('students.attend')

  useEffect(() => {
    const studentId = mutation.data
    if (studentId) {
      localStorage.setItem('studentId', studentId.toString())
      router.push('/thankYou')
    }
  }, [mutation.isSuccess])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((state) => ({ ...state, name: e.target.value }))
  }

  const handleCohort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((state) => ({ ...state, cohort: +e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    localStorage.setItem('signIn', JSON.stringify(form))

    mutation.mutate({
      name: form.name as string,
      cohort: form.cohort as number,
    })
  }

  return (
    <main className="w-full bg-softblue  text-2xl">
      <form
        className="mx-auto min-h-screen flex flex-col justify-evenly gap-4 p-8 shadow-md rounded"
        onSubmit={handleSubmit}
      >
        <p className="text-center text-slate-100 font-semibold tracking-widest">
          Sign-in Form
        </p>
        <fieldset className="text-center flex flex-col gap-1">
          <input
            type="text"
            name="name"
            className="w-64 p-2 mx-auto font-bold text-2xl rounded-md border-solid border-2 border-slate-200 focus:outline-yellow text-ultraviolet "
            onChange={handleNameChange}
            value={form.name}
            required
            placeholder="Enter your name"
          />
        </fieldset>
        <fieldset className="mx-auto">
          {data && <Cohorts cohorts={data} handleCohort={handleCohort} />}
        </fieldset>

        <button className="mx-auto my-4 w-3/4 h-24 text-white font-bold tracking-widest bg-ultraviolet rounded-3xl">
          Sign-In
        </button>
      </form>
    </main>
  )
}

type FormType = {
  name?: string
  cohort?: number
}

export default SignIn
