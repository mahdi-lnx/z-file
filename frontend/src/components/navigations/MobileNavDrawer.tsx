
import type { ReactElement } from "react"
import type { AppLinkProps } from "./AppLink.tsx"
import { Drawer } from "../layouts/Drawer.tsx"
import { Nav } from "./Nav.tsx"
import { useDrawer } from "../../hooks/useDrawer.ts"
import { cn } from "../../utils/general.ts"
import { HamburgerButton } from "../buttons/HamburgerButton.tsx"


type MobileNavDrawerProps = {
    links: AppLinkProps[];
    closeOnNavigate?: boolean;
    navOpenerClassName?: string;
};


/**
 * A high-level Mobile Nav Drawer component
 */
export const MobileNavDrawer = ({
    links, closeOnNavigate=true, navOpenerClassName="",
}: MobileNavDrawerProps): ReactElement => {

    const controller = useDrawer();

    const finalLinks: AppLinkProps[] = closeOnNavigate ? links.map(link => {
        return {
            ...link,
            onClick: (event) => {
                link.onClick?.(event);

                // only close the drawer if the navgigation has happend
                !event.defaultPrevented && controller.close();
            }
        };
    }) : links;

    return (
        <>
            { !controller.isOpen && <HamburgerButton className={cn(
                navOpenerClassName,
                "duration-800",
            )} onClick={controller.open}/> }

            <Drawer controller={controller}
            backdropZIndexClass={cn("z-[calc(var(--z-mobile-nav-drawer)-1)]")}
            className={cn( 
                "px-17",
                "py-7",
                "z-(--z-mobile-nav-drawer)",
                "flex",
                "flex-col",
                "gap-17",
                "duration-800",
                "fixed",
                "top-0",
                "left-0",
                "h-full",
                "w-[90%]", 
                "bg-(image:--gradient-white-linen)",
                "dark:bg-(image:--gradient-premium-black)",
                "xs:w-[70%]",
                !controller.isOpen && "-translate-x-700",
                !controller.isOpen && "opacity-0",
            )}>
                <div className="flex justify-end">
                    { 
                        controller.isOpen &&
                        <HamburgerButton isOpen={true} onClick={controller.close}
                        className={cn(
                            "duration-800",
                        )}/> 
                    }
                </div>

                <Nav links={finalLinks} className={{
                    ul: cn(
                        "flex",
                        "flex-col",
                        "gap-17",
                    ),
                }}/>
            </Drawer>
        </>
    );
}

