
import type { ChangeEvent, FocusEvent, HTMLInputTypeAttribute, ReactElement } from "react"
import type { BaseInputFieldProps } from "./InputField.types.ts"
import { Input, type InputProps } from "./Input.tsx"
import { InputLabel } from "./InputLabel.tsx"
import { InputError } from "./InputError.tsx"
import { cn } from "../../utils/general.ts"
import type { InputFieldStateUpdate } from "../../hooks/useInputFields.ts";


export type TextInputFieldProps = {
    type?: Extract<HTMLInputTypeAttribute, "text" | "tel" | "email" | "search" | "password">;
    label?: string;
} & BaseInputFieldProps; 


/**
 * A High-level Input Field component meant for text inputs
 * Note: Consumers should use more specific input fields if available
 */
export const TextInputField = ({ 
    controller: { state: { value, isDirty, error }, updateState, }, 
    inputProps={}, controlled=false, wrapperClassName, 
    size="base", schema, type="text", label="", 
}: TextInputFieldProps): ReactElement => {

    const isValid = error === null;

    let finalInput: InputProps = { 
        type,
        inputSize: size,
        isDirty,
        isValid,
        ...inputProps,
        onChange: (event: ChangeEvent<HTMLInputElement, HTMLInputElement>): void => {
            inputProps.onChange?.(event);

            const newState: InputFieldStateUpdate = {};

            if(controlled){
                newState.value = event.target.value;
            }
            if(isValid){
                newState.error = null;
            }
            if(!isDirty){
                newState.isDirty = true;
            }

            Object.keys(newState).length > 0 && updateState(newState);

        },
        onBlur: (event: FocusEvent<HTMLInputElement, HTMLInputElement>) => {
            inputProps.onBlur?.(event);

            const result = schema?.safeParse(event.target.value);

            if(!result){
                return;
            } 

            !result.success && updateState({ error: result.error.issues[0].message });
        },
    };

    // if value is not a string
    // fallback to default uncontrolled input

    if(typeof value === "string"){
        if(controlled){
            finalInput.value = value;
        }
        else{
            finalInput.defaultValue = value;
        }
    }

    return (
        <div className={cn(
            wrapperClassName,
        )}>
            <InputLabel htmlFor={finalInput.id} size={size}>
                { label }
            </InputLabel>

            <Input {...finalInput}/>

            <InputError size={size}>
                { error }
            </InputError>
        </div>
    );
}

