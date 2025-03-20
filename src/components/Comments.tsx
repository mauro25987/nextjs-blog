import { Comment } from '@/types/types'
import CommentPost from './Comment'

export async function fetchComments(id: string): Promise<{ comments: Comment[] }> {
  await new Promise(resolve => setTimeout(resolve, 5000))
  const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
  const comments = await commentsResponse.json()
  return { comments }
}

export default async function Comments({ id }: { id: string }) {
  const { comments } = await fetchComments(id)
  return (
    <ul>
      {comments.map(comment => (
        <CommentPost key={comment.id} comment={comment} />
      ))}
    </ul>
  )
}
