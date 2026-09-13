
import type { ReactElement } from "react";
import { AppLink, type AppLinkProps } from "./AppLink.tsx"


export type NavProps = {
    links: AppLinkProps[];
    className?: {
        nav?: string;
        ul?: string;
        li?: string;
    };
};


/**
 * A general low-level Nav component that is meant to be used
 * by high-level nav components
 */
export const Nav = ({ 
    links, className={ nav: "", ul: "", li: "", },
}: NavProps): ReactElement => {

    return (
        <nav className={className.nav}>
            <ul className={className.ul}>
                {links.map(link => 
                    <li className={className.li}>
                        <AppLink {...link}/>
                    </li>
                )}
            </ul>
        </nav>
    );
}

