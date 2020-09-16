import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Mainlayout } from '../components/MainLayout'
import { MyPost } from '../interfaces/post'
import { NextPageContext } from 'next'

interface PostsPageProps {
  posts: MyPost[]
}


export default function Posts({ posts: serverPosts }: PostsPageProps) {

  const [posts, setPosts] = useState(serverPosts)

  useEffect(() => {
    async function load() {
      const response = await fetch(`${process.env.API_URL}/posts`)
      const data = await response.json()
      setPosts(data)
    }
    if (!serverPosts) {
      // if the server did not send anything, then we download posts from the frontend
      console.log('Loading posts on request from the frontend ...')
      load()
    }
  }, [])

  if (!posts) {
    return (
      <Mainlayout>
        <p>Loading ...</p>
      </Mainlayout>
    )
  }

  return (
    <Mainlayout title={'Posts page'}>
      <h1>Posts page</h1>
      <ul>
        {
          posts.map(post => (
            <li key={post.body}>
              <Link href={`/post/[id]`} as={`/post/${post.id}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
      </ul>
    </Mainlayout>
  )

}

Posts.getInitialProps = async ({ req }: NextPageContext) => {
  if (!req) {
    // Handling link clicks in the frontend
    console.log('req === null. We are on frontend side now ...')
    return { posts: null }
  }
  // Processing a direct call to the server (there was no following link inside the frontend)
  console.log('req !== null. We are on server side now ...')
  const response = await fetch(`${process.env.API_URL}/posts`)
  const posts: MyPost[] = await response.json()
  return {
    posts
  }
}