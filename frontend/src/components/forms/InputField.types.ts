
// This module provides InputField related types
// which is shared by all InputField components

import type * as z from "zod"
import type { InputFieldController } from "../../hooks/useInputFields.ts"
import type { InputProps, InputSizes } from "./Input.tsx"


// Valid sizes of an InputField
export type InputFieldSizes = keyof InputSizes;

// All InputField components props inherit from this type
export type BaseInputFieldProps = {
    size?: InputFieldSizes;
    schema?: z.ZodType; 
    inputProps?: Omit<
        InputProps, 
        "type" | "inputSize" | "isValid" | "isDirty" | "checked" | "defaultChecked" | "value" | "defaultValue" | "className"
    >; 
    className?: {
        wrapper?: string;
        input?: string;
        label?: string;
        error?: string;
    };
    controlled?: boolean;
    controller: InputFieldController;
};

