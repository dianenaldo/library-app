"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formSchema } from "@/lib/formSchema";
import * as z from "zod";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditBook from "@/components/ui/editBook";
import DeleteBook from "./deleteBook";

type BookSchema = z.infer<typeof formSchema>;
type BookSchemaWithId = BookSchema & {
  id: number;
};

export const columns: ColumnDef<BookSchemaWithId>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "publishedDate",
    header: "Published",
    cell: ({ row }) => {
      const formattedDate = format(row.getValue("publishedDate"), "PPP");

      return formattedDate;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <EditBook Book={row.original} />
            <DeleteBook Book={row.original} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: () => {
      return "";
    },
  },
];
