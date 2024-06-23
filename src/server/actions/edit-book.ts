"use server"

import { db } from "@/server/db";
import { formSchema } from "@/lib/formSchema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-actions";
import * as z from "zod"

const formSchemaWithId = formSchema.extend({
    id: z.number()
})

export const editBook = actionClient
    .schema(formSchemaWithId)
    .action(async ({ parsedInput: { id, title, author, genre, publishedDate } }) => {
        try {
            const response = await db.book.update({
                data: {
                    title,
                    author,
                    genre,
                    publishedDate
                },
                where: {
                    id
                }
            });

            if (response) {
                revalidatePath("/");

                return {
                    success: "Successfully updated a book."
                }
            }

        } catch (error: any) {
            console.error({ error });
            return {
                error: "Failed to update a book."
            }
        }
    });