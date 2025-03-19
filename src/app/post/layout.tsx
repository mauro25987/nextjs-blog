import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = { title: 'Pagina de post' }

export default function LayoutPost({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <footer>
        <hr />
        <h1 className="pt-8 text-center text-2xl font-bold">Soy el footer</h1>
      </footer>
    </>
  )
}
