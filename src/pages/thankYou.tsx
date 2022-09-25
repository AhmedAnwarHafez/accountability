import type { NextPage } from 'next'

const thankYou: NextPage = () => {
  return (
    <main className="flex flex-col gap-4 fixed items-center justify-center w-full h-full bg-softblue text-ultraviolet font-semibold text-3xl tracking-widest">
      <p>You are signed in</p>
      <p>Thank You</p>
    </main>
  )
}

export default thankYou
