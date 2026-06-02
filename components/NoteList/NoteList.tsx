import { deleteNote } from "@/lib/api"
import css from "./NoteList.module.css"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Note } from "@/types/note"
import Link from "next/link"


type NoteListProps = {
  notes: Note[]
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`notes`] })
    },
  })

  const handleDelete = (id: string) => {
    mutation.mutate(id)
  }

  return (
    <ul className={css.list}>
      {notes.map((note: Note) => (
        <li key={note.id} className={css.listItem}>
          <Link href={`/notes/${note.id}`} className={css.cardLink}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
          </Link>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              onClick={() => handleDelete(note.id)}
              className={css.button}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default NoteList
