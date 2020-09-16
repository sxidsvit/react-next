import Link from 'next/link'
import Head from 'next/head'
import { Mainlayout } from '../components/MainLayout'

export default function Index() {
  return (
    <Mainlayout title='Home page'>
      <h1>Hello, Next.JS!</h1>

      <p><Link href={'/about'}><a>About</a></Link></p>
      <p><Link href={'/posts'}><a>Posts</a></Link></p>

      <p> Это параграф со случайным текстом </p>
    </Mainlayout>

  )
}
