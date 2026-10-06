
// This module provides InputField related types
// which is shared by all InputField components

import type * as z from "zod"
import type { InitialInputFieldState, InputFieldState, InputFieldStateUpdaterFn } from "../../hooks/useInputFields.ts"
import type { InputSizes } from "./Input.tsx"


// Valid sizes of an InputField
export type InputFieldSizes = keyof InputSizes;

// All InputField components props inherit from
// this type
export type BaseInputFieldProps = {
    size?: InputFieldSizes;
    schema?: z.ZodType; 
    wrapperClassName?: string;
    updateInputFieldState: InputFieldStateUpdaterFn;
} & InputFieldState;

// Used by consumers when providing InputField props
// to the useForm hook
export type InitialInputFieldsProps< 
    T extends BaseInputFieldProps
> = Omit<
        T, keyof Omit<InputFieldState, "fieldId"> | "updateInputFieldState"
    > & InitialInputFieldState;

