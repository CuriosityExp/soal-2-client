import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Link className='p-5 bg-sky-400 rounded-lg' href={"login"}>Login</Link>
      </div>
    </main>
  )
}
