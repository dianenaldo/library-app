"use server"

import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-actions";
import * as z from "zod"

const formSchema = z.object({
    id: z.number()
})

export const deleteBook = actionClient
    .schema(formSchema)
    .action(async ({ parsedInput: { id } }) => {
        try {
            const response = await db.book.delete({
                where: {
                    id
                }
            });

            if (response) {
                revalidatePath("/");

                return {
                    success: "Successfully deleted a book."
                }
            }

        } catch (error: any) {
            console.error({ error });
            return {
                error: "Failed to delete a book."
            }
        }
    });