"use client";

import { useGetBooks } from "@/data/get-books";
import { columns } from "@/components/ui/bookColumns";
import { DataTable } from "./ui/datatable";

export default function Books() {
  const { data: books, error } = useGetBooks();
  if (books?.success)
    return (
      <div className="container">
        <DataTable columns={columns} data={books?.success} />
      </div>
    );
}
