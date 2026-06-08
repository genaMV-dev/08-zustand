import { NewNoteBody } from "@/types/note"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface DraftNoteStore {
  draft: NewNoteBody
  setDraft: (draft: NewNoteBody) => void
  clear: () => void
}

const initialDraft: NewNoteBody = {
  title: ``,
  content: ``,
  tag: `Todo`,
}

export const useDraftStore = create<DraftNoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (draft: NewNoteBody) => set({ draft }),
      clear: () => set({ draft: initialDraft }),
    }),
    { name: "Draft note", partialize: (state) => ({ draft: state.draft }) },
  ),
)
