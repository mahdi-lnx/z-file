
import { useRef, useState, type RefObject } from "react"
import { useInputFields, type InputFieldsController, type InitialInputFieldState, } from "./useInputFields.ts"


type FormStatus<T> = 
    | { status: "idle"; }
    | { status: "loading"; }
    | { status: "success"; data: T; }
    | { status: "error"; error: Error; }

type FormController<T, U> = {
    formStatus: FormStatus<T>;
    updateFormStatus: (newStatus: FormStatus<T>) => void;
    inputFieldsController: InputFieldsController<U>;
    formRef: RefObject<HTMLFormElement | null>
    scrollFormIntoView: (config?: ScrollIntoViewOptions) => void
};


export const useForm = <T, U extends InitialInputFieldState>(inputFieldsProps: U[]): FormController<T, U> => {
    const [ formStatus, setFormStatus ] = useState<FormStatus<T>>({ status: "idle", });
    const inputFieldsController = useInputFields<U>(inputFieldsProps);
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
        inputFieldsController,
        formRef,
    };
}

