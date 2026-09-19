
import { type ReactElement } from "react"
import type { AppLinkProps } from "../navigations/AppLink.tsx"
import { Outlet } from "react-router"
import { AppHeader } from "../headers/AppHeader.tsx"
import { MobileNavDrawer } from "../navigations/MobileNavDrawer.tsx"
import { TopNavBar } from "../navigations/TopNavBar.tsx"
import { cn } from "../../utils/general.ts"
import { useMatchMedia } from "../../hooks/useMatchMedia.ts"


export const PublicLayout = (): ReactElement => {

    const matches = useMatchMedia({ query: "screen and (width >= 768px)", });

    const links: AppLinkProps[] = [
        { as: "Link", to: "./", children: "Home", },
        { as: "NavLink", to: "./sign-in", children: "Sign-In", },
        { as: "NavLink", to: "./sign-up", children: "Sign-Up", },
        { as: "NavLink", to: "./contact", children: "Contact", },
    ];

    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
            <AppHeader logo={{ to: "./", }} 
            className={cn(
                "relative"
            )}>
                {
                    matches ? (
                        <TopNavBar links={links}/>
                    ) : ( 
                        <MobileNavDrawer links={links} navOpenerClassName={cn(
                            "absolute",
                            "top-1/2",
                            "-translate-y-1/2",
                            "right-17",
                        )}/>
                    )

                }
            </AppHeader>

            <main>
                <Outlet/>
            </main>
        </div>
    );
}

