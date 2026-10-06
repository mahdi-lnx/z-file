
import { useState } from "react"


// TODO: need to move these into the root of the project
type PartialBy<T, U extends keyof T> = Omit<T, U> & Partial<Pick<T, U>>;
type RequiredBy<T, U extends keyof T> = Required<Pick<T, U>> & Omit<T, U>;


export type InputFieldState = { 
    fieldId: string;
    value: string | string[]; // may need to change this as the app grows
    error: string | null;
    isDirty: boolean;
};

export type InitialInputFieldState = PartialBy<InputFieldState, "value" | "error" | "isDirty">;

export type InputFieldStateUpdate = InitialInputFieldState;

export type InputFieldStateUpdaterFn = (stateValue: InputFieldStateUpdate) => void;

export type InputFieldsController<T> = {
    inputFields: Array<T & InputFieldState>;
    updateInputFieldState: InputFieldStateUpdaterFn;
};



export const useInputFields = <T extends InitialInputFieldState>(initialInputFields: T[]): InputFieldsController<T> => {
    const [ inputFields, setInputFields ] = useState<Array<T & InputFieldState>>(() => {
        return initialInputFields.map(initialInputField => {
            return {
                value: "",
                error: null,
                isDirty: false,
                ...initialInputField,
            };
        })

    });

    const updateInputFieldState = ({ fieldId, ...newState }: InputFieldStateUpdate): void => {
        setInputFields(prevInputFields => {
            const fieldIdIsValid = prevInputFields.find(prevInputField => prevInputField.fieldId === fieldId) !== undefined;

            if(!fieldIdIsValid){
                return prevInputFields;
            }

            return prevInputFields.map(prevInputField => {
                return prevInputField.fieldId === fieldId ? { ...prevInputField, ...newState } : prevInputField;
            });
        });
    }

    return {
        inputFields: inputFields,
        updateInputFieldState,
    };
}

