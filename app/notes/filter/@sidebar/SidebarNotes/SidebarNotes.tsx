import Link from "next/link"
import css from "./SidebarNotes.module.css"
import { NoteTags } from "@/types/note"


const SidebarNotes = () => {

  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>

      {NoteTags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SidebarNotes