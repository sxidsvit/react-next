import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Mainlayout } from '../../components/MainLayout'
import { NextPageContext } from 'next'
import { MyPost } from '../../interfaces/post'

interface PostPageProps {
  post: MyPost
}

export default function Post({ post: serverPost }: PostPageProps) {

  const [post, setPost] = useState(serverPost)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const response = await fetch(`${process.env.API_URL}/posts/${router.query.id}`)
      const data = await response.json()
      setPost(data)
    }
    if (!serverPost) {
      // if the server did not send anything, then we download posts from the frontend
      console.log('Loading post on request from the frontend ...')
      load()
    }
  }, [])

  if (!post) {
    return (
      <Mainlayout>
        <p>Loading ...</p>
      </Mainlayout>
    )
  }

  return (
    <Mainlayout>
      <h1>{post.title}</h1>
      <hr />
      <p>{post.body}</p>
      <Link href={'/'}><a>Back to all posts</a></Link>
    </Mainlayout>
  )
}

interface PostNextPageContext extends NextPageContext {
  query: {
    id: string
  }
}

export async function getServerSideProps({ query }: PostNextPageContext) {
  // This function is always called on the server and never on the client
  console.log('req !== null. We are on server side now ...')
  const response = await fetch(`${process.env.API_URL}/posts/${query.id}`)
  const post: MyPost = await response.json()

  return {
    props: { post }
  }
}


// Post.getInitialProps = async ({ query, req }) => {
//   if (!req) {
//     // Handling link clicks in the frontend
//     console.log('req === null. We are on frontend side now ...')
//     return { post: null }
//   }
//   // Processing a direct call to the server (there was no following link inside the frontend)
//   console.log('req !== null. We are on server side now ...')
//   const response = await fetch(`http://localhost:4200/posts/${query.id}`)
//   const post = await response.json()
//   return {
//     post
//   }
// }
