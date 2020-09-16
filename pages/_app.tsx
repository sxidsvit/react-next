
import NextNprogress from 'nextjs-progressbar'
import '../styles/main.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <NextNprogress
        color="yellow"
        startPosition={0.3}
        stopDelayMs={200}
        height={30}
      />
    </>
  )
}