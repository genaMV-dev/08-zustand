import NotePreview from "@/app/@modal/NotePreview/NotePreview.client"
import { getNoteItem } from "@/lib/api"

interface Props {
  params: Promise<{ id: string }>
}

const PreviewPage = async ({ params }: Props) => {
  const { id } = await params

  const note = await getNoteItem(id)

  return <NotePreview note={note} />
}

export default PreviewPage
