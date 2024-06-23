import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAction } from "next-safe-action/hooks"
import { deleteBook } from "@/server/actions/delete-book"

const DeleteBook = ({ Book } : any) => {

  const { execute, status } = useAction(deleteBook, {
    onSuccess(data) {
      console.log({ data });
    },
    onError(error) {
      console.error({ error });
    },
    onExecute(args) {
      console.log({ args });
    },
  });

  const onDelete = (Book: any) => {
    if (Book?.id) {
      execute({
        id: Book?.id
      })
    }
  }

  return (
    <>
      <DropdownMenuItem onClick={() => onDelete(Book)}>Delete</DropdownMenuItem>
    </>
  );
};

export default DeleteBook;
