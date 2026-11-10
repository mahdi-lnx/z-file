
import type { ReactElement, SubmitEvent } from "react"
import { useForm } from "../../hooks/useForm.ts"
import { TextInputField, type TextInputFieldProps } from "./TextInputField.tsx"
import { LoadingButton } from "../buttons/LoadingButton.tsx"
import { cn } from "../../utils/general.ts"
import { subscriptionFormSchema } from "../../schemas/formSchemas.ts"
import * as z from "zod"


export const SubscriptionForm = (): ReactElement => {

    const { fieldControllers, setInputFieldErrors } = useForm({
        email: {},
    });

    const inputFieldsProps: TextInputFieldProps[] = [
        {
            schema: subscriptionFormSchema.shape.email, // extract the email schema out of the subscriptionFormSchema object schema
            className: {
                wrapper: cn( 
                    "flex",
                    "flex-col",
                    "gap-7"
                ),
                input: cn(
                    "pr-0",
                    "py-0",
                ),
                error: cn(
                    "ml-15",
                ),
            },
            type: "email",
            label: "Your Email",
            hideLabel: true,
            controller: fieldControllers.email,
            size: "lg",
            inputProps: {
                id: "email",
                placeholder: "Your Email",
                name: "email",
                shape: "pill",
                endElement: (
                    <LoadingButton shape="pill" size="xl">
                        Subscribe
                    </LoadingButton>
                ),
            },
        },
    ];

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = Object.fromEntries(new FormData(event.target)); 

        const result = subscriptionFormSchema.safeParse(formData);

        if(!result.success){
            const { fieldErrors  } = z.flattenError(result.error);

            setInputFieldErrors({ fieldErrors, })

            return;
        }

        // TODO: submit the resposne to the server
    }

    return (
        <form noValidate={true} onSubmit={handleSubmit}>
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

