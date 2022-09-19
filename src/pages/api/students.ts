// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../server/db/client'

const students = async (req: NextApiRequest, res: NextApiResponse) => {
  const students = await prisma.students.findMany()
  res.status(200).json(students)
}

export default students
