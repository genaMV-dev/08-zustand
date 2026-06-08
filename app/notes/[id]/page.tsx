import { getNoteItem } from "@/lib/api"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import NoteDetails from "./NoteDetails.client"
import { Metadata } from "next"

interface Props {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params
  const note = await getNoteItem(id)

  return {
    title: note.title,
    description: note.content,
    openGraph: {
      title: note.title,
      description: note.content,
      url: "https://08-zustand-bice-phi.vercel.app/",
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  }
}

const NoteDetailsPage = async ({ params }: Props) => {
  const queryClient = new QueryClient()

  const { id } = await params

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteItem(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  )
}

export default NoteDetailsPage
