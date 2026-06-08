import { getNotes } from "@/lib/api"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import Notes from "./Notes.client"
import type { NoteTag } from "@/types/note"
import { Metadata } from "next"

type Props = {
  params: Promise<{
    slug: string[]
  }>
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params
  const tag = slug[0] === "all" ? undefined : (slug[0] as NoteTag)
  if (slug[0] === "all") {
    return {
      title: `All`,
      description: `All notes`,
      openGraph: {
        title: "All",
        description: "All notes",
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        images: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    }
  }
  return {
    title: tag,
    description: `You choose tag: ${tag}`,
    openGraph: {
      title: tag,
      description: `You choose tag: ${tag}`,
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      images: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
    },
  }
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
