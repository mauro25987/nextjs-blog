import Comments from '@/components/Comments'
import Fallback from '@/components/Fallback'
import { Post, User } from '@/types/types'
import { Suspense } from 'react'

async function fetchPostData(id: string): Promise<{ user: User; post: Post }> {
  const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const post = await postResponse.json()

  const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
  const user = await userResponse.json()

  return { post, user }
}

export default async function PagePost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { user, post } = await fetchPostData(id)
  return (
    <div>
      <h2>{post.title}</h2>
      <h4>
        Escrito por {user.name} ({user.email})
      </h4>
      <p>{post.body}</p>
      <hr />
      <h3>Comentarios</h3>
      <Suspense fallback={<Fallback />}>
        <Comments id={id} />
      </Suspense>
    </div>
  )
}
