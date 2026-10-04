
import type { InputHTMLAttributes, ReactElement } from "react"
import { cn } from "../../utils/general.ts"


export type InputSizes = {
    sm: string;
    base: string;
    lg: string;
    xl: string;
};

type InputShapes = {
    rounded: string;
    pill: string;
    sharp: string;
};

export type InputProps = {
    inputSize?: keyof InputSizes; // we chose this name to avoid conflicting with the native size attribute
    shape?: keyof InputShapes;
    isDirty?: boolean;
    isValid?: boolean | null;
    endElement?: ReactElement; // used for inputs that have elements inside of them like a Show/Hide password Input
} & InputHTMLAttributes<HTMLInputElement>;


export const Input = ({
    inputSize="base", shape="rounded",
    isDirty=false, isValid=null, endElement, className, ...props
}: InputProps): ReactElement => {

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
    const selectedShape = inputShapes[shape];
    const tone = cn( 
        "text-dark",
        "bg-amber-50",
        "dark:bg-mauve-900",
        "dark:text-light",
        !isDirty && "border-amber-950",
        !isDirty && "dark:border-mauve-700",
        isDirty && isValid === true && "border-success",
        isDirty && isValid === false && "border-danger"
    );

    if(endElement){
        return (
            <div className={cn(
                "outline-0",
                "border-3",
                "has-[input:focus]:border-blue-700", 
                "focus-visible:border-accent",
                "has-disabled:cursor-not-allowed",
                "has-disabled:opacity-70",
                "has-disabled:pointer-events-none",
                tone,
                selectedSize,
                selectedShape,
                className,
            )}>
                <input className={cn(
                    "outline-0",
                    "bg-transparent",
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
            tone,
            selectedSize,
            selectedShape,
            className,
        )} {...props}/>
    );
}

