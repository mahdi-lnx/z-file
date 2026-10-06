
import type { ReactElement } from "react"
import { useForm } from "../../hooks/useForm.ts"
import type { InitialInputFieldsProps } from "./InputField.types.ts"
import { TextInputField, type TextInputFieldProps } from "./TextInputField.tsx"


export const SubscriptionForm = (): ReactElement => {

    const inputFieldProps: Array<InitialInputFieldsProps<TextInputFieldProps>> = [{
        fieldId: "subscription-email",
    }];

    const { inputFieldsController: {
        inputFields,
        updateInputFieldState,
    }, } = useForm(inputFieldProps);

    return (
        <form onClick={(event) => {
            event.preventDefault();
        }}>
            <fieldset>
                {inputFields.map(inputField => {
                    return (
                        <TextInputField key={inputField.fieldId} {...inputField} updateInputFieldState={updateInputFieldState}/>
                    );
                })}
            </fieldset>
            <div>
            </div>
        </form>
    );
}

