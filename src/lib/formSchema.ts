import * as z from "zod"

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  author: z.string().min(1, {
    message: "Author is required",
  }),
  genre: z.string().min(1, {
    message: "Genre is required",
  }),
  publishedDate: z.coerce.date()
});