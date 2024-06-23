"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "@/lib/formSchema";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { createBook } from "@/server/actions/create-book";
import { editBook } from "@/server/actions/edit-book";
import { useAction } from "next-safe-action/hooks";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useBookStore } from "@/store/bookStore";
import { useEffect } from "react";

const formSchemaWithId = formSchema.extend({
  id: z.number().optional(),
});

export default function BookForm() {
  const { isOpen, setIsOpen, book, clearBook } = useBookStore();

  const form = useForm<z.infer<typeof formSchemaWithId>>({
    resolver: zodResolver(formSchemaWithId),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      publishedDate: undefined,
    },
  });

  useEffect(() => {
    if (book?.id) {
      const { id, title, author, genre, publishedDate } = book;
      form.reset();
      form.setValue("id", id);
      form.setValue("title", title);
      form.setValue("author", author);
      form.setValue("genre", genre);
      form.setValue("publishedDate", new Date(publishedDate));
    }
  }, [book]);

  const { execute, status } = useAction(book?.id ? editBook : createBook, {
    onSuccess(data) {
      onClose();
    },
    onError(error) {
      console.error({ error });
    },
    onExecute(args) {
      console.log({ args });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchemaWithId>) => {
    execute(values);
  };

  const onClose = () => {
    form.reset();
    clearBook();
    setIsOpen(false);
  };

  const onOpen = () => {
    form.reset();
    clearBook();
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="container my-2">
        <DialogTrigger asChild>
          <Button onClick={onOpen}>New Book</Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{book?.id ? "Edit Book" : "New Book"}</DialogTitle>
        </DialogHeader>
        <div className="container">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {book?.id && (
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="hidden" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="title"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publishedDate"
                render={({ field }: any) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Published</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="reset" onClick={onClose}>
                  Cancel
                </Button>
                <Button disabled={status === "executing"} type="submit">
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
