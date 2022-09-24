import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { trpc } from '../utils/trpc'

const SignIn: NextPage = () => {
  const router = useRouter()
  const mutation = trpc.useMutation(['students.attend.as.an.existing.student'])

  useEffect(() => {
    const id = localStorage.getItem('studentId')
    if (id) {
      const studentId = +id
      mutation.mutate({ studentId: studentId })
      router.push('/thankYou')
    }
  }, [])

  return (
    <main className="w-full flex flex-col justify-center h-screen bg-ultraviolet  text-2xl">
      <Link href="/newstudent">
        <a className="text-center bg-yellow text-slate-700 rounded-full mx-auto p-6 m-4 w-72">
          I am a new student
        </a>
      </Link>
      <Link href="/visitor">
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
