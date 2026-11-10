
// This module provides zod schemas for the forms

import * as z from "zod"
import { emailSchema } from "./inputFieldSchemas";

// subscriptionForm is the zod schema for a sbuscription form
export const subscriptionFormSchema = z.strictObject({
    email: emailSchema,
});

