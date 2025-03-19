import { Post } from '@/app/page'
import { Suspense } from 'react'

type User = {
  name: string
  email: string
}
type Comment = {
  id: number
  email: string
  body: string
}

async function fetchPostData(id: string): Promise<{ user: User; post: Post }> {
  const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const post = await postResponse.json()

  const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
  const user = await userResponse.json()

  return { post, user }
}

async function fetchComments(id: string): Promise<{ comments: Comment[] }> {
  await new Promise(resolve => setTimeout(resolve, 5000))
  const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
  const comments = await commentsResponse.json()
  return { comments }
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
      <ul>
        <Suspense fallback={<Loading />}>
          <Comments id={id} />
        </Suspense>
      </ul>
    </div>
  )
}

async function Comments({ id }: { id: string }) {
  const { comments } = await fetchComments(id)
  return comments.map(comment => (
    <li key={comment.id}>
      <p>
        Escrito por <strong>{comment.email}</strong>
      </p>
      <p>
        <em>{comment.body}</em>
      </p>
    </li>
  ))
}

function Loading() {
  return <div>Cargando los comentarios con fallback</div>
}
