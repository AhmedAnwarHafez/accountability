import Image from 'next/image'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { trpc } from '../utils/trpc'

const SignIn: NextPage = () => {
  const [form, setForm] = useState<FormType>({ name: '', type: 'student' })
  const { query } = useRouter()

  const mutation = trpc.useMutation('students.attend')

  useEffect(() => {
    const storage = localStorage.getItem('signIn')
    if (storage) {
      // setForm(JSON.parse(storage))
    }
  }, [])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((state) => ({ ...state, name: e.target.value }))
  }

  const handlePersonTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((state) => ({ ...state, type: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    localStorage.setItem('signIn', JSON.stringify(form))

    if (form.name && query.token) {
      mutation.mutate({
        name: form.name,
        cohort: 'pohu',
        token: query.token as string,
      })
    }
  }

  return (
    <main className="w-full max-w-md bg-slate-200">
      <form
        className="container min-h-screen flex flex-col justify-evenly gap-4 p-8 shadow-md rounded"
        onSubmit={handleSubmit}
      >
        <p className="text-center tracking-widest">Sign-in Form</p>
        <fieldset className="text-center flex flex-col items-start mx-auto">
          <div className="flex items-baseline">
            <input
              type="radio"
              name="type"
              id="student"
              checked={form.type === 'student'}
              value="student"
              onChange={handlePersonTypeChange}
              className="checked:text-softblue"
            />
            <label htmlFor="student" className="mx-2 text-2xl">
              Student
            </label>
          </div>
          <div className="flex items-baseline">
            <input
              type="radio"
              name="type"
              id="guest"
              checked={form.type === 'guest'}
              value="guest"
              onChange={handlePersonTypeChange}
              className="checked:text-softblue"
            />
            <label htmlFor="guest" className="mx-2 text-2xl">
              Non-student
            </label>
          </div>
        </fieldset>
        <fieldset className="text-center flex flex-col gap-1">
          <input
            type="text"
            name="name"
            className="w-3/4 p-2 mx-auto text-2xl font-bold text-center rounded-md border-solid border-2 border-slate-200 focus:outline-none focus:outline-1 focus:outline-yellow"
            onChange={handleNameChange}
            value={form.name}
            placeholder="enter your name"
          />
        </fieldset>

        <button className="mx-auto my-4 w-3/4 h-24 text-white text-2xl bg-ultraviolet rounded-3xl">
          Sign-In
        </button>
      </form>
    </main>
  )
}

type FormType = {
  name?: string
  type?: string
}

export default SignIn
