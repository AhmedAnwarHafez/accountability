import type { NextPage } from 'next'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const { data } = trpc.useQuery(['students.getAll'])
  const mutation = trpc.useMutation('students.attend')

  const handleClick = (id: number) => {
    mutation.mutate({ id })
  }

  return (
    <>
      <h1 className="text-2xl md:text-2xl text-center mt-10 leading-normal font-extrabold text-gray-700">
        morning accountability
      </h1>
      <main className="container mx-auto flex flex-col items-center justify-around min-h-screen p-4">
        <section>
          <ul className="flex flex-col">
            {data?.map(({ id, name }) => (
              <li
                key={id}
                className="text-3xl text-center rounded-lg p-10 my-5 border-2 border-solid border-slate-600"
                onClick={() => handleClick(id)}
              >
                {name}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

export default Home
