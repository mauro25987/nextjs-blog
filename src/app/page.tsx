import { Post } from '@/types/types'
import Link from 'next/link'

async function fetchData(): Promise<Post[]> {
  await new Promise(resolve => setTimeout(resolve, 3000))
  // throw new Error('Error server')
  const data = await fetch('https://jsonplaceholder.typicode.com/posts')
  return data.json()
}

export default async function Home() {
  const posts = await fetchData()
  return (
    <div>
      <ul>
        {posts.map(({ id, title }) => (
          <li key={id}>
            <Link href={`/post/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
