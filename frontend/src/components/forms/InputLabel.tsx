
import type { LabelHTMLAttributes, ReactElement } from "react"
import type { InputSizes } from "./Input.tsx"
import { cn } from "../../utils/general.ts"


type InputLabelSizes = InputSizes;

export type InputLabelProps = {
    size?: keyof InputLabelSizes;
} & LabelHTMLAttributes<HTMLLabelElement>;


export const InputLabel = ({
    size="base", className, children, ...props
}: InputLabelProps): ReactElement => {

    const sizes: InputLabelSizes = {
        sm: cn(
            "text-lg",
        ),
        base: cn( 
            "text-xl",
        ),
        lg: cn(
            "text-xl",
        ),
        xl: cn(
            "text-2xl"
        )
    };

    const selectedSize = sizes[size];

    return (
        <label className={cn(
            "text-dark",
            "dark:text-light",
            selectedSize,
            className,
        )} {...props}>
            { children }
        </label>
    );
}

