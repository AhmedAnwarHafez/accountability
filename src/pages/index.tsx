import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const router = useRouter()
  const { data } = trpc.useQuery(['students.getAll'])

  const handleClick = (id: number) => {
    console.log(id);
    router.push('/thankYou')
  }

  return (
    <>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl md:text-2xl leading-normal font-extrabold text-gray-700">
          Morning accountability
        </h1>
        <section>
          <ul>
            {data?.map(({ id, name }) => (
              <li key={id}>
                <button onClick={() => handleClick(id)}>{name}</button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

export default Home
