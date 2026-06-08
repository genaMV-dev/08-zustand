import { Metadata } from "next"
import CreateFormClient from "./CreateFormClient"

export const metadata: Metadata = {
  title: "Create new Note",
  description: "Page for creating new note",
  openGraph: {
    title: "Create new Note",
    description: "Page for creating new note",
    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
    images: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
  }
}

const CreatePage = () => {
  return (
    <div>
      <CreateFormClient/>
    </div>
  )
}

export default CreatePage
