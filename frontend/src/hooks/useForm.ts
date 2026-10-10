
import { useRef, useState, type RefObject } from "react"
import { useInputFields, type InputFieldControllers, type InitialInputFieldStates, } from "./useInputFields.ts"


type FormStatus<T> = 
    | { status: "idle"; }
    | { status: "loading"; }
    | { status: "success"; data: T; }
    | { status: "error"; error: Error; }

type FormController<T, U> = {
    formStatus: FormStatus<T>;
    updateFormStatus: (newStatus: FormStatus<T>) => void;
    fieldControllers: InputFieldControllers<U>;
    formRef: RefObject<HTMLFormElement | null>
    scrollFormIntoView: (config?: ScrollIntoViewOptions) => void
};


export const useForm = <T, U extends InitialInputFieldStates>(fieldStates: U): FormController<T, U> => {
    const [ formStatus, setFormStatus ] = useState<FormStatus<T>>({ status: "idle", });
    const fieldControllers = useInputFields<U>(fieldStates);
    const formRef = useRef<HTMLFormElement | null>(null);

    const updateFormStatus = (newStatus: FormStatus<T>): void => setFormStatus(newStatus);

    const scrollFormIntoView = ({
        behavior="smooth", block="start", inline="nearest",
    }: ScrollIntoViewOptions = {}): void => {
        formRef.current?.scrollIntoView({ behavior, block, inline, });
    }

    return { 
        formStatus,
        updateFormStatus,
        scrollFormIntoView,
        fieldControllers,
        formRef,
    };
}

