import { getNotes } from "@/lib/api"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import Notes from "../../Notes.client"
import type { NoteTag } from "@/types/note"
import SidebarNotes from "../@sidebar/SidebarNotes/SidebarNotes"

type Props = {
  params: Promise<{
    slug: string[]
  }>
}

const NotesFilterPage = async ({ params }: Props) => {
  const { slug } = await params
  const tag = slug[0] === "all" ? undefined : (slug[0] as NoteTag)

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () =>
      getNotes({
        page: 1,
        perPage: 10,
        searchQuery: "",
        tag,
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} />
    </HydrationBoundary>
  )
}

export default NotesFilterPage
