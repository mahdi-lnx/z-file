
import type { HTMLAttributes } from "react"
import type { InputSizes } from "./Input.tsx"
import { cn } from "../../utils/general.ts"


type InputErrorSizes = InputSizes

export type InputErrorProps = {
    size?: keyof InputErrorSizes;
} & HTMLAttributes<HTMLParagraphElement>;


export const InputError = ({
    size="base", className, children, ...props
}: InputErrorProps) => {

    const sizes: InputErrorSizes = {
        sm: cn(
            "text-sm",
        ),
        base: cn(
            "text-base",
        ),
        lg: cn(
            "text-base",
        ),
        xl: cn(
            "text-lg",
        )
    };

    const selectedSize = sizes[size];

    return (
        <p className={cn(
            selectedSize,
            "text-danger",
            "font-medium",
            className,
        )} {...props}>
            { children }
        </p>
    );
}

