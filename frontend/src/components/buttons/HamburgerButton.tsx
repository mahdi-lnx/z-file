
import type { ButtonHTMLAttributes, ReactElement } from "react"
import { cn } from "../../utils/general.ts"


type HamburgerButtonTones = {
    auto: string;
    light: string;
    dark: string;
};

type HamburgerButtonSizes = {
    sm: string;
    base: string;
    lg: string;
};

type HamburgerButton = {
    isOpen?: boolean;
    tone?: keyof HamburgerButtonTones;
    size?: keyof HamburgerButtonSizes; 
} & ButtonHTMLAttributes<HTMLButtonElement>;


export const HamburgerButton = ({
    isOpen=false, tone="auto", size="base", className="", ...props
    
}: HamburgerButton): ReactElement => {

    const tones: HamburgerButtonTones = {
        auto: cn(
            "bg-dark",
            "dark:bg-light",
        ),
        light: cn("bg-light"),
        dark: cn("bg-dark"),
    };

    const sizes: HamburgerButtonSizes = {
        sm: cn(
            "w-30",
            "h-5",
            isOpen && "first:rotate-41",
            isOpen && "first:translate-y-20",
            isOpen && "last:-rotate-45",
        ),
        base: cn(
            "w-37",
            "h-7",
            isOpen && "first:rotate-42",
            isOpen && "first:translate-y-25",
            isOpen && "last:-rotate-45",
        ),
        lg: cn(
            "w-44",
            "h-9",
            isOpen && "first:rotate-42",
            isOpen && "first:translate-y-28",
            isOpen && "last:-rotate-45",
        ),
    };

    const selectedTone = tones[tone];
    const selectedSize = sizes[size];

    return (
        <button {...props} className={cn(
            "flex",
            "flex-col",
            "shrink-0",
            "gap-5",
            "cursor-pointer",
            "focus-visible-ring",
            className,
        )}>
            {[0, 1, 2].map(i => 
                <span key={i} className={cn(
                    "rounded-sm",
                    "transition-[opacity,rotate,translate]",
                    "duration-300",
                    "ease-in-out",
                    isOpen && "nth-2:opacity-0",
                    selectedTone,
                    selectedSize,
                )}>
                </span>
            )}
        </button>
    );
}

