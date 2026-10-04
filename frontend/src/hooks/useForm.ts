
import { useState } from "react"


type InputFieldState = { 
    value: string | string[]; // may need to change this as the app grows
    error: string | null;
    isDirty: boolean;
};

type InitialInputFieldState = Partial<InputFieldState> & { fieldId: string };

type InputFieldStates = {
    [fieldId: string]: InputFieldState;
};

type InputFieldsController = {
    inputFieldStates: InputFieldStates;
    updateInputFieldState: (fieldId: string, stateValue: Partial<InputFieldState>) => void;
};

const useInputFields = (inputFieldStates: InitialInputFieldState[]): InputFieldsController => {
    const [ states, setStates ] = useState<InputFieldStates>(() => {
        const temp: InputFieldStates = {};

        for(const { fieldId, ...rest } of inputFieldStates){
            temp[fieldId] = {
                value: "",
                error: null,
                isDirty: false,
                ...rest,
            };
        }

        return temp;
    });

    const updateInputFieldState = (fieldId: string, stateValue: Partial<InputFieldState>): void => {
        setStates(prevStates => {
            return { 
                ...prevStates,
                [fieldId]: {
                    ...prevStates[fieldId],
                    ...stateValue,
                },
            }
        });
    }

    return {
        inputFieldStates: states,
        updateInputFieldState,
    };
}


type FormStatus<T> = 
    | { status: "idle"; }
    | { status: "loading"; }
    | { status: "success"; data: T; }
    | { status: "error"; error: Error; }

type FormController<T> = {
    formStatus: FormStatus<T>;
    updateFormStatus: (newStatus: FormStatus<T>) => void;
    inputFieldsController: InputFieldsController;
};

export const useForm = <T,>(inputFieldStates: InitialInputFieldState[]): FormController<T> => {
    const [ formStatus, setFormStatus ] = useState<FormStatus<T>>({ status: "idle", });
    const inputFieldsController = useInputFields(inputFieldStates);

    const updateFormStatus = (newStatus: FormStatus<T>): void => setFormStatus(newStatus);

    const formController: FormController<T> = { 
        formStatus,
        updateFormStatus,
        inputFieldsController,
    };

    return formController;
}

