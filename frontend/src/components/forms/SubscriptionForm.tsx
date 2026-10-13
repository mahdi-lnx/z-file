
import type { ReactElement } from "react"
import { useForm } from "../../hooks/useForm.ts"
import { TextInputField, type TextInputFieldProps } from "./TextInputField.tsx"
import { LoadingButton } from "../buttons/LoadingButton.tsx"
import { cn } from "../../utils/general.ts"


export const SubscriptionForm = (): ReactElement => {

    const { fieldControllers, } = useForm({
        email: {},
    });

    const inputFieldsProps: TextInputFieldProps[] = [
        {
            label: "Your Email",
            hideLabel: true,
            controller: fieldControllers.email,
            inputProps: {
                id: "email",
                className: cn(
                    "pr-0",
                    "py-0",
                ),
                shape: "pill",
                endElement: (
                    <LoadingButton shape="pill">
                        Subscribe
                    </LoadingButton>
                ),
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
        </form>
    );
}

