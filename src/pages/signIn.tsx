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
    } else {
      router.push('/newstudent')
    }
  }, [])

  return <></>
}

export default SignIn
