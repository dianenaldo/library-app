"use server"

import { db } from "@/server/db";

export const fetchBooks = async () => {
    const books = await db.book.findMany({
        orderBy: {
            id: 'desc',
        }
    });
    if (!books) return { error: "No books." }
    if (books) return { success: books }
}