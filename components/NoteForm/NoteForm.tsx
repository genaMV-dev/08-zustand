"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import css from "./NoteForm.module.css"
import { useRouter } from "next/navigation"
import { createNote } from "@/lib/api"
import { NewNoteBody } from "@/types/note"
import { useDraftStore } from "@/lib/store/noteStore"
import { ChangeEvent, FormEvent } from "react"

interface NoteFormProps {
  onClose?: () => void
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { draft, setDraft, clear } = useDraftStore()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (newNote: NewNoteBody) => createNote(newNote),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`notes`] })
      clear()
      router.push(`/notes/filter/all`)
      onClose?.()
    },
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setDraft({ ...draft, [name]: value })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newNote: NewNoteBody = {
      title: draft.title.trim(),
      content: draft.content,
      tag: draft.tag,
    }

    await mutateAsync(newNote)
  }

  const handleCancel = () => {
    clear()
    router.back()
    onClose?.()
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={draft.title}
          onChange={handleChange}
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={draft.content}
          onChange={handleChange}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" disabled={isPending} className={css.submitButton}>
          {isPending ? `Creating...` : `Create note`}
        </button>
        <button
          type="button"
          className={css.cancelButton}
          disabled={isPending}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default NoteForm
