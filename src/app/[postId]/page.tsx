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
  postId: number
): Promise<{ post: Post; user: User; comments: Comment[] }> {
  const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  const post = await postResponse.json()

  const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
  const user = await userResponse.json()

  const commentsResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  )
  const comments = await commentsResponse.json()

  return { post, user, comments }
}

export default async function Page({ params }: { params: { postId: number } }) {
  const { postId } = await params
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
