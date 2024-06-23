import BookForm from "@/components/book-form";
import Books from "@/components/books";
import { fetchBooks } from "@/server/actions/fetch-books";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
  return (
    <main>
      <Tabs defaultValue="first" className="container">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="first">First</TabsTrigger>
          <TabsTrigger value="second">Second</TabsTrigger>
          <TabsTrigger value="third">Third</TabsTrigger>
        </TabsList>
        <TabsContent value="first">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="my-12">
              <BookForm />
              <Books />
            </div>
          </HydrationBoundary>
        </TabsContent>
      </Tabs>
    </main>
  );
}
