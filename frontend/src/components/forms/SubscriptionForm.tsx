
import type { ReactElement } from "react"
import { useForm } from "../../hooks/useForm.ts"
import { TextInputField, type TextInputFieldProps } from "./TextInputField.tsx"


export const SubscriptionForm = (): ReactElement => {

    const { fieldControllers, } = useForm({
        email: {},
    });

    const inputFieldsProps: TextInputFieldProps[] = [
        {
            controller: fieldControllers.email,
            inputProps: {
                id: "email",
            },
        },
    ];

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
        }}>
            <fieldset>
                {inputFieldsProps.map(inputField => {
                    return (
                        <TextInputField key={inputField.inputProps?.id} {...inputField}/>
                    );
                })}
            </fieldset>
            <div>
            </div>
        </form>
    );
}

