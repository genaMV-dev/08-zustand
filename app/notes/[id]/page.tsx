import { getNoteItem } from "@/lib/api"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import NoteDetails from "./NoteDetails.client"

interface Props {
  params: Promise<{ id: string }>
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
