
import { useRef, useState, type RefObject } from "react"
import { useInputFields, type InputFieldControllers, type InitialInputFieldStates, } from "./useInputFields.ts"


type FormStatus<T> = 
    | { status: "idle"; }
    | { status: "loading"; }
    | { status: "success"; data: T; }
    | { status: "error"; error: Error; }

type SetInputFieldErrorsOptions<T extends InitialInputFieldStates> = {
    fieldErrors: Partial<Record<keyof T, string[]>>;
    clearOtherFields?: boolean;
};

type FormController<T, U extends InitialInputFieldStates> = {
    formStatus: FormStatus<T>;
    updateFormStatus: (newStatus: FormStatus<T>) => void;
    fieldControllers: InputFieldControllers<U>;
    formRef: RefObject<HTMLFormElement | null>
    scrollFormIntoView: (config?: ScrollIntoViewOptions) => void
    setInputFieldErrors: (options: SetInputFieldErrorsOptions<U>) => void;
};


export const useForm = <T, U extends InitialInputFieldStates>(fieldStates: U): FormController<T, U> => {
    const [ formStatus, setFormStatus ] = useState<FormStatus<T>>({ status: "idle", });
    const fieldControllers = useInputFields<U>(fieldStates);
    const formRef = useRef<HTMLFormElement | null>(null);

    const updateFormStatus = (newStatus: FormStatus<T>): void => setFormStatus(newStatus);

    /**
     * A high-level Form api that sets InputField errors
     */
    const setInputFieldErrors = ({ fieldErrors, clearOtherFields=false, }: SetInputFieldErrorsOptions<U>) => {

        for(const controllerId in fieldControllers){

            if(!(controllerId in fieldErrors) && clearOtherFields){
                fieldControllers[controllerId].updateState({ error: null });
                continue;
            }
            const errors = fieldErrors[controllerId];

            if(!errors){
                // the controllerId was not present in fieldErrors
                continue;
            }

            fieldControllers[controllerId].updateState({ error: errors[0] ?? null, });
        }
    } 

    const scrollFormIntoView = ({
        behavior="smooth", block="start", inline="nearest",
    }: ScrollIntoViewOptions = {}): void => {
        formRef.current?.scrollIntoView({ behavior, block, inline, });
    }

    return { 
        formStatus,
        fieldControllers,
        formRef,
        updateFormStatus,
        scrollFormIntoView,
        setInputFieldErrors,
    };
}

