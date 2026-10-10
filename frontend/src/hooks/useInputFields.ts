
import { useState } from "react"


// TODO: need to move these into the root of the project
type PartialBy<T, U extends keyof T> = Omit<T, U> & Partial<Pick<T, U>>;
type RequiredBy<T, U extends keyof T> = Required<Pick<T, U>> & Omit<T, U>;

type InputFieldState = {
    value: string | string[]; // may need to change this as the app grows
    error: string | null;
    isDirty: boolean;
};

type InputFieldStates<T> = Record<keyof T, InputFieldState>;

type InitialInputFieldState = Partial<InputFieldState>;

export type InputFieldStateUpdate = Partial<InputFieldState>;

export type InitialInputFieldStates = Record<string, InitialInputFieldState>;

export type InputFieldController = {
    state: InputFieldState;
    updateState: (newState: InputFieldStateUpdate) => void;
};

export type InputFieldControllers<T> = Record<keyof T, InputFieldController>;

export const useInputFields = <T extends InitialInputFieldStates>(initialInputFields: T): InputFieldControllers<T> => {
    const [ inputFieldStates, setInputFieldsStates ] = useState<InputFieldStates<T>>(() => {
        const states = {} as InputFieldStates<T>;

        for(const fieldId in initialInputFields){
            states[fieldId] = {
                value: "",
                error: null,
                isDirty: false,
                ...initialInputFields[fieldId],
            }
        }

        return states;
    });


    const controllers = {} as InputFieldControllers<T>;

    for(const fieldId in inputFieldStates){
        controllers[fieldId] = {
            state: inputFieldStates[fieldId],
            updateState: (newState: Partial<InputFieldState>): void => {
                setInputFieldsStates(prevInputFieldStates => {
                    return {
                        ...prevInputFieldStates,
                        [fieldId]: {
                            ...prevInputFieldStates[fieldId],
                            ...newState,
                        },
                    };
                });
            }
        };
    }

    return controllers;
}

