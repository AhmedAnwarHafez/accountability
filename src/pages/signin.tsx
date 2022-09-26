import moment from 'moment'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { trpc } from '../utils/trpc'

const SignIn: NextPage = () => {
  const router = useRouter()
  const mutation = trpc.useMutation(['students.attend.as.an.existing.student'])
  const [studentId, setStudentId] = useState<number>()

  const { data } = trpc.useQuery([
    'students.getStudent',
    { studentId: studentId || 0 },
  ])

  useEffect(() => {
    const id = localStorage.getItem('studentId')
    if (id) {
      setStudentId(+id)
    } else {
      router.push('/newstudent')
    }
  }, [])

  const handleSubmit = () => {
    if (studentId) {
      mutation.mutate({ studentId })
      router.push('/thankYou')
    }
  }

  return (
    <main className="h-screen bg-softblue flex flex-col justify-center items-center text-2xl text-ultraviolet">
      <p>Hello {data?.name}!</p>
      <p>Today is {moment().format('dddd DD MMM HH:MM')}</p>
      <button
        className="rounded-2xl bg-ultraviolet p-4 px-8 mt-4 text-white"
        onClick={handleSubmit}
      >
        Sign In
      </button>
    </main>
  )
}

export default SignIn
