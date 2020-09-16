import Link from "next/link"
import Head from "next/head"


export const Mainlayout = ({ children, title = 'App' }) => {
  return (
    <>
      <Head>
        <title> {title} | Next</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta name="description" content="next.js, react" />
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <nav>
        <Link href="/"><a>Главная</a></Link>
        <Link href="/about"><a>About</a></Link>
        <Link href="/posts"><a>Posts</a></Link>
      </nav>
      <main>
        {children}
      </main>
      <style jsx>
        {`
          nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: darkblue;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          nav a {
            color: white;
            text-decoration: none;
          }

          main {
            margin-top: 40px;
            padding: 2rem;
          }
        `}
      </style>
    </>
  )
}
