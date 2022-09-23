import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import QRCode from 'react-qr-code'

import { trpc } from '../utils/trpc'

type Props = { host: string | null }

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => ({ props: { host: context.req.headers.host || null } })

const Home: NextPage<Props> = ({ host }) => {
  const { data } = trpc.useQuery(['students.getToken'])

  const url = `https://${host}/signInForm?token=${data?.token}`

  return (
    <>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen">
        <Image
          src="/pattern.png"
          alt="the badge for dev academey"
          width={'500'}
          height={'100'}
          layout="fixed"
        />
        <section className="flex justify-center items-center">
          <Image
            src="/badge.png"
            alt="the badge for dev academey"
            width={'100'}
            height={'100'}
            layout="fixed"
          />
          <h1 className="text-5xl md:text-3xl text-center font-mono text-gray-700">
            Dev Academy Aotearoa
          </h1>
        </section>

        <Image
          src="/pattern.png"
          alt="the badge for dev academey"
          width={'500'}
          height={'100'}
          layout="fixed"
        />
        <p className="text-xl my-2">Please scan QR Code</p>
        <section
          style={{
            height: 'auto',
            margin: '0 auto',
          }}
        >
          <QRCode size={256} value={url} viewBox={`0 0 256 256`} />
        </section>
      </main>
    </>
  )
}

export default Home
