
import type { ReactElement } from "react"
import type { AppLinkProps } from "./AppLink.tsx"
import { Nav } from "./Nav.tsx"
import { cn } from "../../utils/general.ts"


type TopNavBarProps = {
    links: AppLinkProps[],
};


export const TopNavBar = ({ links }: TopNavBarProps): ReactElement => {

    return (
        <>
            <Nav links={links} className={{
                ul: cn(
                    "flex",
                    "gap-17",
                ),
            }}/>
        </>
    );
}

