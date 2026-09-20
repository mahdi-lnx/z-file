
import type { ReactElement } from "react"
import { cn } from "../../utils/general.ts"
import { config } from "../../config.ts"


type AppfooterProps = {
    children?: ReactElement;
    className?: string;
};


export const AppFooter = ({ children, className }: AppfooterProps): ReactElement => {

    return (
        <footer className={cn(
            "bg-(image:--gradient-soft-neutral-inverted)",
            "dark:bg-(image:--gradient-inverted-dark-olive)",
            className,
        )}>
            { children }

            <p className={cn(
                "p-3",
                "bg-dark",
                "text-light",
                "text-center",
            )}>
                &copy; 2026 { config.company.brandName } | All Rights Reserved
            </p>
        </footer>
    );
}

