
import type { ReactElement } from "react"
import { Button, type ButtonProps } from "./Button.tsx"
import { Spinner, type SpinnerProps } from "../spinners/Spinner.tsx"
import { cn } from "../../utils/general.ts"


type LoadingButtonProps = {
    loading?: boolean;
    hideContentOnLoading?: boolean;
    spinnerProps?: SpinnerProps;
} & Omit<ButtonProps, "disabled">;


export const LoadingButton = ({ 
    loading=false, hideContentOnLoading=true, 
    spinnerProps:{ className: spinnerClassName, size="2xs", ...restOfSpinnerProps }={},
    children, className, ...rest }: LoadingButtonProps 
): ReactElement => {

    return (
        <Button {...rest} disabled={loading} className={cn(
            "relative",
            loading && !hideContentOnLoading && "flex",
            loading && !hideContentOnLoading && "justify-center",
            loading && !hideContentOnLoading && "items-center",
            loading && !hideContentOnLoading && "gap-7",
            className,
        )}>
             <span className={cn(
                loading && hideContentOnLoading && "invisible",
            )}>
                { children }
            </span>
            { loading && <Spinner size={size} className={cn( 
                hideContentOnLoading && "absolute",
                hideContentOnLoading && "top-1/2",
                hideContentOnLoading && "-translate-y-1/2",
                hideContentOnLoading && "left-1/2",
                hideContentOnLoading && "-translate-x-1/2",
                spinnerClassName
            )} {...restOfSpinnerProps}/> }
        </Button>
    );
}

