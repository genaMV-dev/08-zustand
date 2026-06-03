"use client"

import Modal from "@/components/Modal/Modal"
import { getNoteItem } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"

const NotePreview = () => {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params.id

  const { data: note, isPending, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteItem(id),
    refetchOnMount: false,
  })

  if(isPending){
    return <p>Loading...</p>
  }

  if(isError){
    return <p>Some error</p>
  }

  const handleClose = () => {
    router.back()
  }

  if (!note) return null

  return (
    <Modal isOpen onClose={handleClose}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{note.createdAt}</p>
      <p>{note.tag}</p>
      <button type="button" onClick={handleClose}>
        Cancel
      </button>
    </Modal>
  )
}

export default NotePreview
