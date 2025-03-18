import { type Post } from '../page'

type User = {
  name: string
  email: string
}
type Comment = {
  id: number
  email: string
  body: string
}

async function fetchPostData(
  postId: string
): Promise<{ post: Post; user: User; comments: Comment[] }> {
  try {
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    if (!postResponse.ok) {
      throw new Error('Error consulta post')
    }
    const post = await postResponse.json()

    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
    if (!userResponse.ok) {
      throw new Error('Error consulta user')
    }
    const user = await userResponse.json()

    const commentsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    )
    if (!commentsResponse.ok) {
      throw new Error('Error consulta comentarios')
    }
    const comments = await commentsResponse.json()
    return { post, user, comments }
  } catch (error) {
    console.log('Error al obtener datos:', error)
    throw error
  }
}

export default async function Page({ params }: { params: Promise<{ postId: string }> }) {
  const postId = (await params).postId
  const { user, post, comments } = await fetchPostData(postId)
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
        {comments.map(comment => (
          <li key={comment.id}>
            <p>
              Escrito por <strong>{comment.email}</strong>
            </p>
            <p>
              <em>{comment.body}</em>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
