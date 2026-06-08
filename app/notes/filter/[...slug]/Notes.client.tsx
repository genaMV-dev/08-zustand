"use client"

import { useMutation } from "@tanstack/react-query"
import css from "./Notes.module.css"
import { useRouter } from "next/navigation"
import { createNote } from "@/lib/api"
import { NewNoteBody, NoteTag } from "@/types/note"
import { useDraftStore } from "@/lib/store/noteStore"
import { ChangeEvent } from "react"


const CreateFormClient = () => {
  const router = useRouter()

  
  const { draft, setDraft, clear } = useDraftStore()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (newNote: NewNoteBody) => createNote(newNote),
  })

  const handleCancel = () => {
    router.back()
  }

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title")?.toString() ?? ""
    const content = formData.get("content")?.toString() ?? ""
    const tag = formData.get("tag") as NoteTag

    const newNote: NewNoteBody = { title, content, tag }
    console.log(tag)

    await mutateAsync(newNote)
    clear()
    router.push(`/notes/filter/all`)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value }) 
  }

  return (
    <div>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            className={css.input}
            defaultValue={draft.title}
            onChange={handleChange}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            defaultValue={draft.content}
            onChange={handleChange}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select
            id="tag"
            name="tag"
            className={css.select}
            defaultValue={draft.tag}
            onChange={handleChange}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button disabled={isPending} className={css.submitButton}>
            {isPending ? `Creating...` : `Create note`}
          </button>
          <button
            disabled={isPending}
            type="button"
            onClick={handleCancel}
            className={css.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
export default CreateFormClient
