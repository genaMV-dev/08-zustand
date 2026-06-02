import { getNotes } from "@/lib/api"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import Notes from "./Notes.client"

const App = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () =>
      getNotes({
        page: 1,
        perPage: 10,
        searchQuery: "",
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes />
    </HydrationBoundary>
  )
}

export default App
