
import { type ReactElement } from "react"
import type { AppLinkProps } from "../navigations/AppLink.tsx"
import { Outlet } from "react-router"
import { AppHeader } from "../headers/AppHeader.tsx"
import { MobileNavDrawer } from "../navigations/MobileNavDrawer.tsx"
import { TopNavBar } from "../navigations/TopNavBar.tsx"
import { AppFooter } from "../footers/AppFooter.tsx"
import { Heading } from "../typography/Heading.tsx"
import { cn } from "../../utils/general.ts"
import { useMatchMedia } from "../../hooks/useMatchMedia.ts"
import { config } from "../../config.ts"
import { SubscriptionForm } from "../forms/SubscriptionForm.tsx"


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

            <AppFooter>
                <section className={cn(
                    "my-17",
                    "px-17",
                    "grid",
                    "md:grid-cols-[1fr_1fr]",
                    "gap-27"
                )}>
                    <div className={cn(
                        "flex",
                        "flex-col",
                        "md:items-center",
                        "gap-15"
                    )}>
                        <Heading as="h2" variant="section" className={cn(
                            "mb-9",
                            "capitalize",
                            "md:text-center",
                        )}>
                            Subscribe to our mailing list!
                        </Heading>

                        <SubscriptionForm/>
                    </div>

                    <div className={cn(
                        "flex",
                        "flex-col",
                        "gap-9",
                    )}>
                        <Heading as="h2" variant="section" className={cn(
                            "md:self-center",
                        )}>
                            Contact
                        </Heading>
                        <address>
                            <span className={cn(
                                "font-normal"
                            )}> 
                                Phone Number: 
                            </span> 
                            &nbsp; { config.company.phoneNumber }<br/>

                            <span className={cn(
                                "font-normal",
                            )}> 
                                Address: 
                            </span>
                            &nbsp; { config.company.address }<br/>

                            <span className={cn(
                                "font-normal",
                            )}>
                                Hours: 
                            </span> 
                            &nbsp; { config.company.hours }
                        </address>
                    </div>
                </section>
            </AppFooter>
        </div>
    );
}

