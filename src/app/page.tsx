import Link from 'next/link'

export type Post = {
  userId?: number
  id: number
  title: string
  body?: string
}

async function fetchData(): Promise<Post[]> {
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
            <Link href={`/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
