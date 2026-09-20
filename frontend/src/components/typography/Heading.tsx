
import type { ReactElement, ReactNode } from "react"
import { cn } from "../../utils/general.ts"


type HeadingTones = {
    auto: string;
    light: string;
    dark: string;
    custom: string;
};

type HeadingVariants = {
    page: string;
    section: string;
    subsection: string;
    custom: string;
};

type HeadingProps = {
    as?: "h1" | "h2" | "h3" | "h4";
    tone?: keyof HeadingTones;
    variant?: keyof HeadingVariants;
    className?: string;
    children: ReactNode;
};


export const Heading = ({
    as="h1", tone="auto",
    variant="page", className="",
    children,
}: HeadingProps): ReactElement => {

    const Tag = as;

    const variants: HeadingVariants = {
        page: cn(
            "text-4xl",
            "font-semibold",
        ),
        section: cn(
            "text-2xl",
            "font-medium",
        ),
        subsection: cn(
            "text-xl",
            "font-medium",
        ),
        custom: "", // an escape hatch
    };

    const tones: HeadingTones = {
        auto: cn(
            "text-dark",
            "dark:text-light"
        ),
        light: cn(
            "text-light",
        ),
        dark: cn(
            "text-dark"
        ),
        custom: "", // an escape hatch
    };

    const selectedVariant = variants[variant];
    const selectedTone = tones[tone]

    return (
        <Tag className={cn(
            selectedVariant,
            selectedTone,
            className,
        )}>
            { children }
        </Tag>
    );
}

