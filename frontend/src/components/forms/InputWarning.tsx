
import type { HTMLAttributes } from "react"
import type { InputSizes } from "./Input.tsx"
import { cn } from "../../utils/general.ts"


export type InputWarningSizes = InputSizes

type InputWarningProps = {
    size?: keyof InputWarningSizes;
} & HTMLAttributes<HTMLParagraphElement>;


export const InputWarning = ({
    size="base", className, children, ...props
}: InputWarningProps) => {

    const sizes: InputWarningSizes = {
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
            className,
        )} {...props}>
            { children }
        </p>
    );
}

