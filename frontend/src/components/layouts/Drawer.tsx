
import type { ReactNode, ReactElement } from "react"
import type { DrawerController } from "../../hooks/useDrawer.ts"
import { cn } from "../../utils/general.ts";


type DrawerProps = {
    controller: DrawerController;
    backdropZIndexClass: string;
    children: ReactNode;
    className?: string;
};


/**
 * A general Drawer component that is meant to be used and paired
 * with the useDrawer custom hook
 */
export const Drawer = ({ 
    controller, backdropZIndexClass, className="", children,
}: DrawerProps): ReactElement => {

    const { isOpen, close } = controller;

    const backdrop = isOpen && (
        <div onClick={close} className={cn(
            "fixed",
            "inset-0",
            backdropZIndexClass,
        )}>
        </div>
    );

    return (
        <>
            { backdrop }

            <div className={cn(
                "transition-[opacity,translate]",
                "ease-in-out",
                className,
            )}>
                { children }
            </div>
        </>
    );
}

