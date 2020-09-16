
import React from 'react'
import Router from 'next/router'
import { Mainlayout } from '../../components/MainLayout'

export default function About({ title }) {

  const linkHandler = () => Router.push('/')

  return (
    <Mainlayout title={'About page'}>
      <h1>{title} </h1>
      <button onClick={linkHandler}> Go back to home</button>
      <button onClick={() => Router.push('/posts')}> Go to posts</button>
    </Mainlayout>
  )
}

About.getInitialProps = async () => {
  const res = await fetch(`${process.env.API_URL}/about`)
  const data = await res.json()

  return {
    title: data.title
  }
}
