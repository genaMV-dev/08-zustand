"use client"

import { getNotes, NoteApiResponse } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useRef, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import css from "./Notes.module.css"
import SearchBox from "../../components/SearchBox/SearchBox"
import Pagination from "../../components/Pagination/Pagination"
import NoteList from "../../components/NoteList/NoteList"
import Modal from "../../components/Modal/Modal"
import NoteForm from "../../components/NoteForm/NoteForm"
import type { NoteTag } from "@/types/note"

interface NotesProps {
  tag?: NoteTag
}

const Notes = ({ tag }: NotesProps) => {
  const [page, setPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [searchQuery, setSearchQuery] = useState(``)

  const prevDataRef = useRef<NoteApiResponse | null>(null)

  const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value)
    setPage(1)
  }, 300)

  const handleSearchChange = (value: string) => {
    setInputValue(value)
    debouncedSetSearchQuery(value)
  }

  const { data } = useQuery<NoteApiResponse, Error>({
    queryKey: [`notes`, page, searchQuery, tag],
    queryFn: () =>
      getNotes({ page, perPage: 10, searchQuery, tag }),
    placeholderData: () => prevDataRef.current ?? { notes: [], totalPages: 0 },
  })

  useEffect(() => {
    if (data) {
      prevDataRef.current = data
    }
  }, [data])

  const displayData: NoteApiResponse = data ?? { notes: [], totalPages: 0 }

  const onChangePage = (page: number) => {
    setPage(page)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearchChange} />
        {displayData && displayData.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={displayData.totalPages}
            onPageChange={onChangePage}
          />
        )}
        <button className={css.button} onClick={onOpen}>
          Create note +
        </button>
      </header>
      <NoteList notes={displayData?.notes ?? []} />
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <NoteForm onClose={onClose} />
        </Modal>
      )}
    </div>
  )
}

export default Notes
