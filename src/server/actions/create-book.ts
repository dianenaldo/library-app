"use server"

import { db } from "@/server/db";
import { formSchema } from "@/lib/formSchema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-actions";

export const createBook = actionClient
    .schema(formSchema)
    .action(async ({ parsedInput: { title, author, genre, publishedDate } }) => {
        try {
            const response = await db.book.create({
                data: {
                    title,
                    author,
                    genre,
                    publishedDate
                }
            });

            if (response) {
                revalidatePath("/");

                return {
                    success: "Successfully created a book."
                }
            }

        } catch (error: any) {
            console.error({ error });
            return {
                error: "Failed to create a book."
            }
        }
    });