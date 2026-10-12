

import type { HTMLAttributes } from "react"
import { cn } from "../../utils/general.ts";


type SpinnerTones = {
    auto: string;
    light: string;
    dark: string;
};

type SpinnerSizes = {
    xs: string;
    sm: string;
    base: string;
    lg: string;
};

type SpinnerProps = {
    tone?: keyof SpinnerTones;
    size?: keyof SpinnerSizes;
    children?: never;
} & HTMLAttributes<HTMLDivElement>;


export const Spinner = ({ size="sm", tone="auto", className, ...rest }: SpinnerProps) => {

    const tones: SpinnerTones = {
        auto: cn(
            "border-mist-300",
            "border-t-dark",
            "dark:border-mist-500",
            "dark:border-t-light",
        ),
        light: cn(
            "border-mist-500",
            "border-t-light"
        ),
        dark: cn(
            "border-mist-300",
            "border-t-dark",
        ),
    };

    const sizes: SpinnerSizes = {
        xs: cn(
            "w-30",
            "h-30",
            "border-3",

        ),
        sm: cn(
            "w-40",
            "h-40",
            "border-4",
        ),
        base: cn(
            "w-50",
            "h-50",
            "border-4",

        ),
        lg: cn(
            "w-70",
            "h-70",
            "border-5",
        ),
    };

    const selectedTone = tones[tone];
    const selectedSize = sizes[size];


    return (
        <div className={cn(
            "rounded-full",
            "animate-spin",
            selectedTone,
            selectedSize,
            className,
        )} {...rest}>
        </div>
    );
}

