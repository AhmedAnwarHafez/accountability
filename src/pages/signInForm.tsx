import type { NextPage } from 'next'

const SignIn: NextPage = () => {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <img src="/badge.png" alt="" className="w-20 mb-[-40px] z-20" />
      <form className="rounded-md border-solided border-slate-400 border-2 flex flex-col gap-4 p-8">
        <fieldset className="text-center flex flex-col gap-1">
          <label htmlFor="name">Enter Name</label>
          <input
            type="text"
            name="name"
            defaultValue="Ahmad"
            className="w-1/2 mx-auto text-center rounded-md border-solid border-2 border-black"
          />
        </fieldset>
        <fieldset className="text-center flex flex-col">
          <label htmlFor="type" className="text-center">
            Who are you
          </label>
          <div className="mx-auto">
            <input type="radio" name="type" id="" defaultChecked={true} />
            <span className="mx-2">student</span>
          </div>
          <div className="mx-auto">
            <input type="radio" name="type" id="" defaultChecked={true} />
            <span className="mx-2">guest</span>
          </div>
        </fieldset>

        <button className="mx-auto my-4 text-white bg-blue-600 rounded-lg p-2 px-4">
          Sign-In
        </button>
      </form>
    </main>
  )
}

type PersonType = 'student' | 'guest'

type FormType = {
  name?: string
  type?: PersonType
}

export default SignIn
