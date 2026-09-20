
import { useState } from "react"

const useInput = () => {

}

type FormStatus<T> = 
    | { status: "loading"; }
    | { status: "typing"; }
    | { status: "success"; data: T; }
    | { status: "error"; error: Error; }

export const useForm = <T, U>(inputs) => {
    const [ formStatus, setFormStatus ] = useState();

    const updateStatus = <T>(config: FormStatus<T>): void => {
        setFormStatus(config);
    }

    return {
        formStatus,
        setFormStatus,
    };
}

