import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { trpc } from '../utils/trpc'

const SignIn: NextPage = () => {
  const [form, setForm] = useState<FormType>({ name: '' })
  const router = useRouter()

  const { data } = trpc.useQuery(['students.getCohorts'])
  const mutation = trpc.useMutation('students.attend')

  useEffect(() => {
    const storage = localStorage.getItem('signIn')
    if (storage) {
      setForm(JSON.parse(storage))
      // router.push('/thankYou')
    }
  }, [])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((state) => ({ ...state, name: e.target.value }))
  }

  const handleCohort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((state) => ({ ...state, cohort: +e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    localStorage.setItem('signIn', JSON.stringify(form))

    if (form.name && router.query.token) {
      mutation.mutate({
        name: form.name,
        cohort: form.cohort as number,
        token: router.query.token as string,
      })
    }
  }

  return (
    <main className="w-full bg-ultraviolet  text-2xl">
      <form
        className="mx-auto min-h-screen flex flex-col justify-evenly gap-4 p-8 shadow-md rounded"
        onSubmit={handleSubmit}
      >
        <p className="text-center text-white tracking-widest">Sign-in Form</p>
        <fieldset className="text-center flex flex-col gap-1">
          <input
            type="text"
            name="name"
            className="w-64 p-2 mx-auto font-bold text-center text-2xl rounded-md border-solid border-2 border-slate-200 focus:outline-yellow text-ultraviolet "
            onChange={handleNameChange}
            value={form.name}
            required
            placeholder="Enter your name"
          />
        </fieldset>
        <fieldset className="mx-auto">
          <select
            required
            name="cohort"
            id="cohort"
            onChange={handleCohort}
            className="w-64 px-2 text-slate-700"
          >
            <option key={0} value="">
              Your cohort
            </option>
            {data?.map((cohort) => (
              <option key={cohort.id} value={cohort.id}>
                {cohort.name}
              </option>
            ))}
          </select>
        </fieldset>

        <button className="mx-auto my-4 w-3/4 h-24 text-white font-bold tracking-widest bg-yellow rounded-3xl">
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
