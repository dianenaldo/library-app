import { fetchBooks } from "@/server/actions/fetch-books"
import { useQuery } from "@tanstack/react-query"

export function useGetBooks() {
  return useQuery({
    queryFn: async () => fetchBooks(),
    queryKey: ["books"],
  })
}
