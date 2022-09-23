import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { trpc } from '../utils/trpc'

const SignIn: NextPage = () => {
  const [form, setForm] = useState<FormType>({ name: '', type: 'student' })
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

  const handlePersonTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((state) => ({ ...state, type: e.target.value }))
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
    <main className="w-full flex flex-col justify-center h-screen bg-ultraviolet  text-2xl">
      <Link href="/newstudent">
        <a className="text-center bg-yellow text-slate-700 rounded-full mx-auto p-6 m-4 w-72">
          I am a new student
        </a>
      </Link>
      <Link href="/newstudent">
        <a className="text-center bg-yellow text-slate-700 rounded-full mx-auto p-6 m-4 w-72">
        I am a visitor
        </a>
      </Link>
    </main>
  )
}

type FormType = {
  visitorId?: number
  name?: string
  type?: string
  cohort?: number
}

export default SignIn
