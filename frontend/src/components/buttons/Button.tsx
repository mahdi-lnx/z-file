
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react"
import { cn } from "../../utils/general.ts"


type ButtonVariants = {
    primary: string;
    secondary: string;
    danger: string;
    lightGhost: string;
    darkGhost: string;
};

export type ButtonSizes = {
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
};

type ButtonShapes = {
    rounded: string;
    pill: string;
    sharp: string;
};

export type ButtonProps = {
    variant?: keyof ButtonVariants;
    size?: keyof ButtonSizes;
    shape?: keyof ButtonShapes;
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;



export const Button = ({ 
    variant="primary", size="lg", shape="rounded", className="", children, ...props
}: ButtonProps): ReactElement => {

    const variants: ButtonVariants = {
        primary: cn(
            "text-light",
            "bg-blue-700",
            "hover:not-disabled:bg-blue-800",
            "disabled:bg-blue-700/77",
            "focus-visible-ring",
        ),
        secondary: cn(
            "text-light",
            "bg-olive-700",
            "hover:bg-olive-800",
            "disabled:bg-olive-700/77",
            "focus-visible-ring",
        ),
        danger: cn(
            "text-light",
            "bg-rose-700",
            "hover:not-disabled:bg-rose-800",
            "disabled:bg-rose-700/77",
            "focus-visible-ring",
        ),

        // ghost buttons do not have disabled styles because they are NOT
        // supposed to be disabled

        lightGhost: cn( // a light  ghost ghost button for dark bgs
            "outline-0", // need this here to get rid of a default browser style
            "border-3",
            "bg-transparent",
            "text-light",
            "border-light/30",
            "hover:bg-light/10",
            "focus-visible:border-(--focus-visible-outline-color)",

        ), 
        darkGhost: cn( // a dark ghost button for light bgs
            "outline-0", // need this here to get rid of a default browser style
            "border-3",
            "bg-transparent",
            "text-dark",
            "border-mist-700",
            "hover:bg-mist-700/30",
            "focus-visible:border-(--focus-visible-outline-color)",
        ), 
    }

    const sizes: ButtonSizes = {
        sm: cn("py-4 px-7 text-sm"),
        base: cn("py-4 px-7 text-base"),
        lg: cn("py-5 px-8 text-lg"),
        xl: cn("py-6 px-9 text-xl"),
        "2xl": cn("py-7 px-10 text-2xl"),
        "3xl": cn("py-8 px-11 text-3xl"),
    };

    const shapes: ButtonShapes = {
        rounded: cn("rounded-md"),
        pill: cn("rounded-full"),
        sharp: cn("rounded-none"),
    };

    const selectedShape = shapes[shape];
    const selectedVariant = variants[variant];
    const selectedSize = sizes[size];

    return (
        <button className={cn(
            "font-normal",
            "transition-[background-color]",
            "duration-300",
            "ease-in",
            "cursor-pointer",
            "disabled:cursor-not-allowed",
            selectedVariant,
            selectedSize,
            selectedShape,
            className,
        )} {...props}>
            { children }
        </button>
    );
}

