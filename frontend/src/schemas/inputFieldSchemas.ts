
import * as z from "zod"

export const emailSchema = z.email({ error: ({ input }) => input ? "Invalid Email!" : "This field is required!" });

