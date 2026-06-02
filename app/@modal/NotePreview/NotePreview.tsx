"use client"

import Modal from "@/components/Modal/Modal"
import type { Note } from "@/types/note"
import { useRouter } from "next/navigation"

type NotePreviewProps = {
  note: Note
}

const NotePreview = ({ note }: NotePreviewProps) => {
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  return (
    <Modal isOpen onClose={handleClose}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <button type="button" onClick={handleClose}>
          Cancel
        </button>
    </Modal>
  )
}

export default NotePreview
