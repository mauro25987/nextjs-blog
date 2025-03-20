import { Comment } from '@/types/types'
import Image from 'next/image'

export default function CommentPost({ comment }: { comment: Comment }) {
  return (
    <li>
      <div className="flex">
        <div>
          <Image
            width={48}
            height={48}
            src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${comment.email}`}
            alt={comment.email}
          />
        </div>
        <div>
          <p>
            Escrito por <strong>{comment.email}</strong>
          </p>
          <p>
            <em>{comment.body}</em>
          </p>
        </div>
      </div>
    </li>
  )
}
