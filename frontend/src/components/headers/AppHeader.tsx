
import type { ReactElement, ReactNode } from "react"
import { AppLink } from "../navigations/AppLink.tsx"
import { cn } from "../../utils/general"
import { config } from "../../config.ts"


type AppHeaderProps = {
    logo: {
        to: string;
        as?: "h1" | "span";
    };
    children?: ReactNode;
};


export const AppHeader = (
    { logo: { to, as="h1" }, children, }: AppHeaderProps
): ReactElement => {

    const Tag = as;

    return (
        <header className={cn(
            "p-7",
            "flex",
            "justify-center",
            "bg-linear-to-br",
            "bg-(image:--gradient-soft-neutral)",
            "shadow-xs",
            "shadow-mist-400",
            "z-(--z-app-header)",
            "dark:shadow-none",
            "dark:bg-(image:--gradient-dark-olive)",
            "md:p-17",
            "md:justify-between",
        )}>
            <Tag>
                <AppLink as="Link" to={to} variant="custom" className={cn(
                    "text-3xl",
                    "font-medium",
                )}>
                    { config.company.brandName }
                </AppLink>
            </Tag>

            { children }

        </header>
    );
}

