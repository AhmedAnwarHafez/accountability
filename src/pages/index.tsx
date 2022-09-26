import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import QRCode from 'react-qr-code'

type Props = { host: string | null }

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => ({ props: { host: context.req.headers.host || null } })

const Home: NextPage<Props> = ({ host }) => {
  const url = `https://${host}/signin`

  return (
    <>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen bg-softblue">
        <section className="flex flex-col justify-center items-center">
          <Image
            src="/badge.png"
            alt="the badge for dev academey"
            width={'250'}
            height={'250'}
            layout="fixed"
          />
          <h1 className="text-5xl md:text-3xl text-center font-mono text-ultraviolet tracking-widest">
            Dev Academy Aotearoa
          </h1>
        </section>

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
