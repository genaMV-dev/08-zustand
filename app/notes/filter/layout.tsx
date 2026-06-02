import type { ReactNode } from "react"
import css from "./layout.module.css"

type NotesFilterLayoutProps = {
  children: ReactNode
  sidebar: ReactNode
}

const NotesFilterLayout = ({ children, sidebar }: NotesFilterLayoutProps) => {
  return (
    <div className={css.wrapper}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.content}>{children}</main>
    </div>
  )
}

export default NotesFilterLayout
