import { formSchema } from "@/lib/formSchema";
import { create } from "zustand";
import * as z from "zod";

type BookSchema = z.infer<typeof formSchema>;
type BookSchemaWithId = BookSchema & {
  id?: number
}
type BookState = {
  book: BookSchemaWithId;
  editBook: (book: BookSchemaWithId) => void;
  deleteBook: (book: BookSchemaWithId) => void;
  clearBook: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen : boolean) => void;
};

const defaultValue: BookSchemaWithId = {
  title: "",
  author: "",
  genre: "",
  publishedDate: new Date()
}

export const useBookStore = create<BookState>()((set) => ({
  book: defaultValue,
  editBook: (book: BookSchemaWithId) => set(() => ({ book })),
  deleteBook: (book: BookSchemaWithId) => set(() => ({ book })),
  clearBook: () => set(() => ({ book : defaultValue })),
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set(() => ({ isOpen }))
}));
