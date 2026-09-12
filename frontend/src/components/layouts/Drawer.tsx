
import type { ReactElement } from "react"
import type { DrawerController } from "../../hooks/useDrawer.ts"
import { cn } from "../../utils/general.ts";


type DrawerSides = {
    left: string;
    right: string;
};

type DrawerProps = {
    controller: DrawerController;
    side?: keyof DrawerSides;
    backdropZIndexClass: string;
    children: ReactElement;
    className?: string;
};


/**
 * A general Drawer component that is meant to be used and paired
 * with the useDrawer custom hook
 */
export const Drawer = ({ 
    controller, backdropZIndexClass, side="left", 
    className="", children,
}: DrawerProps): ReactElement => {

    const { isOpen, close } = controller;

    const sides: DrawerSides = {
        left: cn(
            isOpen && "left-0",
        ),
        right: cn(
            isOpen && "right-0",
        ),
    };

    const selectedSide = sides[side];

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
                "transition-[opacity,left,right]",
                "ease-in-out",
                selectedSide,
                className,
            )}>
                { children }
            </div>
        </>
    );
}

