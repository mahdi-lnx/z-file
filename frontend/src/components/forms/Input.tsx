
import type { InputHTMLAttributes, ReactElement } from "react"
import { cn } from "../../utils/general.ts"


export type InputSizes = {
    sm: string;
    base: string;
    lg: string;
    xl: string;
};

type InputTones = {
    auto: string;
    light: string;
    dark: string;
};

type InputShapes = {
    rounded: string;
    pill: string;
    sharp: string;
};

export type InputProps = {
    inputSize?: keyof InputSizes; // we chose this name to avoid conflicting with the native size attribute
    tone?: keyof InputTones;
    shape?: keyof InputShapes;
    isUsed?: boolean;
    isValid?: boolean | null;
    endElement?: ReactElement;
} & InputHTMLAttributes<HTMLInputElement>;


export const Input = ({
    inputSize="base", tone="auto", shape="rounded",
    isUsed=false, isValid=null, endElement, className, ...props
}: InputProps): ReactElement => {

    const tones: InputTones = {
        auto: cn(
            "text-dark",
            "bg-amber-50",
            "dark:bg-mauve-900",
            "dark:text-light",
            !isUsed && "border-amber-950",
            !isUsed && "dark:border-mauve-700",
            isUsed && isValid && "border-success",
            isUsed && !isValid && "border-danger"
        ),
        light: cn(
            "text-dark",
            "bg-amber-50",
            !isUsed && "border-amber-950",
            isUsed && isValid && "border-success",
            isUsed && !isValid && "border-danger",
        ),
        dark: cn(
            "text-light",
            "bg-mauve-900",
            !isUsed && "border-mauve-700",
            isUsed && isValid && "border-success",
            isUsed && !isValid && "border-danger",
        ),
    };

    const inputShapes: InputShapes = {
        sharp: cn(
            "rounded-none",
        ),
        rounded: cn(
            "rounded-sm",
        ),
        pill: cn(
            "rounded-full",
        ),
    };

    const sizes: InputSizes = {
        sm: cn(
            "py-5",
            "px-10",
            "w-3xs",
            "text-base",
        ),
        base: cn(
            "py-5",
            "px-10",
            "w-2xs",
            "text-lg",
        ),
        lg: cn(
            "py-7",
            "px-12",
            "w-xs",
            "text-lg",
        ),
        xl: cn(
            "py-7",
            "px-12",
            "w-sm",
            "text-xl",
        ),
    };

    const selectedSize = sizes[inputSize];
    const selectedTone = tones[tone];
    const selectedShape = inputShapes[shape];

    if(endElement){
        return (
            <div className={cn(
                "outline-0",
                "border-3",
                "has-[input:focus]:border-blue-700", 
                "focus-visible:border-accent",
                "disabled:cursor-not-allowed",
                "disabled:opacity-70",
                selectedTone,
                selectedSize,
                selectedShape,
                className,
            )}>
                <input className={cn(
                    "outline-0",
                )} {...props}/>

                { endElement }
            </div>
        );
    }

    return (
        <input className={cn(
            "outline-0",
            "border-3",
            "focus:border-blue-700",
            "focus-visible:border-accent",
            "disabled:cursor-not-allowed",
            "disabled:opacity-70",
            selectedTone,
            selectedSize,
            selectedShape,
            className,
        )} {...props}/>
    );
}

