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
      setForm(JSON.parse(storage))
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
    <main className="container mx-auto flex flex-col items-center justify-center mt-10  p-4">
      <form
        className=" flex flex-col gap-4 p-8"
        onSubmit={handleSubmit}
      >
        <fieldset className="text-center flex flex-col gap-1">
          <label htmlFor="name">Enter Name</label>
          <input
            type="text"
            name="name"
            defaultValue="Ahmad"
            className="w-3/4 p-2 mx-auto text-xl text-center rounded-md border-solid border-2 border-slate-200"
            onChange={handleNameChange}
            value={form.name}
          />
        </fieldset>
        <fieldset className="text-center flex flex-col">
          <div className="mx-auto">
            <input
              type="radio"
              name="type"
              id="student"
              checked={form.type === 'student'}
              value="student"
              onChange={handlePersonTypeChange}
            />
            <label htmlFor="student" className="mx-2">
              Student
            </label>
          </div>
          <div className="mx-auto">
            <input
              type="radio"
              name="type"
              id="guest"
              checked={form.type === 'guest'}
              value="guest"
              onChange={handlePersonTypeChange}
            />
            <label htmlFor="guest" className="mx-2">
              Non-student
            </label>
          </div>
        </fieldset>

        <button className="mx-auto my-4 text-white bg-blue-600 rounded-lg p-2 px-4">
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
