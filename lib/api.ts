import axios from "axios"
import type { NewNoteBody, Note, NoteTag } from "../types/note"
const NEXT_PUBLIC_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

const BASE_URL = "https://notehub-public.goit.study/api"

export interface NoteApiResponse {
  notes: Note[]
  totalPages: number
}

interface NoteResponseParams {
  page: number
  perPage: number
  searchQuery?: string
  tag?: NoteTag
}
export async function getNotes({
  page,
  perPage,
  searchQuery,
  tag,
}: NoteResponseParams): Promise<NoteApiResponse> {
  const res = await axios.get<NoteApiResponse>(`${BASE_URL}/notes`, {
    params: {
      page,
      perPage,
      search: searchQuery,
      tag,
    },
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  })

  return res.data
}

export async function createNote(newNote: NewNoteBody): Promise<Note> {
  const res = await axios.post<Note>(`${BASE_URL}/notes`, newNote, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  })

  return res.data
}

export async function deleteNote(noteId: string): Promise<Note> {
  const res = await axios.delete<Note>(`${BASE_URL}/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  })

  return res.data
}


export async function getNoteItem(Id: string): Promise<Note> {
  const res = await axios.get<Note>(`${BASE_URL}/notes/${Id}`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  })

  return res.data
}

