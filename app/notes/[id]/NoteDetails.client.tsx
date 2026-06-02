"use client"

import { useParams } from "next/navigation"
import css from "./NoteDetails.module.css"
import { useQuery } from "@tanstack/react-query"
import { getNoteItem } from "@/lib/api"


const NoteDetails = () => {
  const params = useParams<{ id: string }>()
  const id = params.id

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteItem(id),
    refetchOnMount: false
  })

  if (isLoading) {
    return <p>Loading, please wait...</p>
  }

  if (isError || !note) {
    return <p>Something went wrong.</p>
  }

  return (
    params && (
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note?.title}</h2>
          </div>
          <p className={css.tag}>{note?.tag}</p>
          <p className={css.content}>{note?.content}</p>
          <p className={css.date}>{note?.createdAt}</p>
        </div>
      </div>
    )
  )
}

export default NoteDetails
