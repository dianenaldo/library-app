import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useBookStore } from "@/store/bookStore";

const EditBook = ({ Book } : any) => {
  const { editBook, setIsOpen } = useBookStore();

  const onEdit = (Book: any) => {
    const { id, title, author, genre, publishedDate} = Book;
    editBook({
        id,
        title,
        author,
        genre,
        publishedDate
    });
    setIsOpen(true);
  }

  return (
    <>
      <DropdownMenuItem onClick={() => onEdit(Book)}>Edit</DropdownMenuItem>
    </>
  );
};

export default EditBook;
