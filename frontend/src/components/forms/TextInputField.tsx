
import type { ChangeEvent, FocusEvent, HTMLInputTypeAttribute, ReactElement } from "react"
import type { BaseInputFieldProps } from "./InputField.types.ts"
import { Input, type InputProps } from "./Input.tsx"
import { InputLabel } from "./InputLabel.tsx"
import { InputError } from "./InputError.tsx"
import { cn } from "../../utils/general.ts"
import type { InputFieldStateUpdate } from "../../hooks/useInputFields.ts";


export type TextInputFieldProps = {
    type?: Extract<HTMLInputTypeAttribute, "text" | "tel" | "email" | "search">;
    inputProps?: Omit<InputProps, "type" | "inputSize" | "isValid" | "isDirty" | "checked" | "defaultChecked">; // may need to add value and defaultValue
    label?: string;
} & BaseInputFieldProps; 

/**
 * A High-level Input Field component meant for text inputs
 * Note: Consumers should use more specific input fields if available
 */
export const TextInputField = ({ 
    fieldId, error, isDirty, value, updateInputFieldState, inputProps={}, 
    wrapperClassName, size="base", schema, type="text", label="", 
}: TextInputFieldProps): ReactElement => {

    const isControlled = Object.hasOwn(inputProps, "value");
    const isValid = error !== null;

    let finalInput: InputProps = { 
        type,
        inputSize: size,
        isDirty,
        isValid,
        ...inputProps,
        onChange: (event: ChangeEvent<HTMLInputElement, HTMLInputElement>): void => {
            inputProps.onChange?.(event);

            const newState: InputFieldStateUpdate = { fieldId };

            if(isControlled){
                newState.value = event.target.value;
            }
            if(isValid){
                newState.error = null;
            }
            if(!isDirty){
                newState.isDirty = true;
            }

            Object.keys(newState).length > 1 && updateInputFieldState(newState);

        },
        onBlur: (event: FocusEvent<HTMLInputElement, HTMLInputElement>) => {
            inputProps.onChange?.(event);

            const result = schema?.safeParse(event.target.value);

            if(!result){
                return;
            } 

            !result.success && updateInputFieldState({ fieldId, error: result.error.issues[0].message });
        },
    };

    if(isControlled){
        finalInput.value = value;
    }
    else if(Object.hasOwn(inputProps, "defaultValue")){
        finalInput.defaultValue = value;
    }

    return (
        <div id={fieldId} className={cn(
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

