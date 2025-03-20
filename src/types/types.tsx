export type User = {
  name: string
  email: string
}

export type Comment = {
  id: number
  email: string
  body: string
}

export type Post = {
  userId?: number
  id: number
  title: string
  body?: string
}
