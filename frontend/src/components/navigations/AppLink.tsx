
import type { AnchorHTMLAttributes, MouseEvent, ReactElement, ReactNode } from "react"
import { NavLink, Link, type LinkProps, type NavLinkProps, type NavLinkRenderProps } from "react-router"
import { cn } from "../../utils/general"


type AppLinkVariant = {
    pageNavigation: string;
    sectionNavigation: string;
    inline: string;
    custom: string;
}

type AppLinkTone = {
    auto: string;
    accent: string; 
    light: string;  
    dark: string; 
    mute: string;
}

export type AppLinkProps = 
    | ({
        as: "a"; variant?: keyof AppLinkVariant; tone?: keyof AppLinkTone; disabled?: boolean; children: ReactNode;
    } & AnchorHTMLAttributes<HTMLAnchorElement>)
    
    | ({
        as: "NavLink"; variant?: keyof AppLinkVariant; tone?: (renderProps: NavLinkRenderProps) => keyof AppLinkTone;
        disabled?: boolean; children: ReactNode;
    } & NavLinkProps)

    | ({
        as: "Link"; variant?: keyof AppLinkVariant; tone?: keyof AppLinkTone; disabled?: boolean; children: ReactNode;
    } & LinkProps)
;


export const AppLink = (props: AppLinkProps): ReactElement => {

    const variants: AppLinkVariant = {
        pageNavigation: cn("text-2xl", "font-medium"),
        sectionNavigation: cn("text-xl", "font-normal"),
        inline: cn("font-medium"), // font-size is auto inheritied
        custom: cn(""), // an escape hatch
    };

    const isDisabled = props.disabled ?? false;

    const tones: AppLinkTone = {
        auto: cn(
            !isDisabled ? "text-dark" : "text-dark/90",
            !isDisabled ? "dark:text-light" : "dark:text-light/90",
        ),
        light: cn(
            !isDisabled ? "text-light" : "text-light/90",
        ),
        dark: cn(
            !isDisabled ? "text-dark" : "dark:text-dark/90",
        ),
        accent: cn(
            !isDisabled ? "text-accent" : "text-accent/90",
        ),
        mute: cn(
            !isDisabled ? "text-dark-mute" : "text-dark-mute/90",
            !isDisabled ? "dark:text-light-mute" : "dark:text-light-mute/90",
        ),
    };

    const selectedVariant = variants[props.variant ?? "pageNavigation"];

    const handleClick = !isDisabled ? props.onClick : (event: MouseEvent<HTMLAnchorElement>) => {
        props.onClick?.(event);
        event.preventDefault();
    }

    if(props.as === "NavLink"){
        const { as, variant, tone, disabled, children, ...linkProps } = props;

        const finalClassName = (renderProps: NavLinkRenderProps): string => cn( 
            isDisabled && "cursor-not-allowed",
            selectedVariant,
            "focus-visible-ring",
            tones[ 
                tone?.(renderProps) ?? 
                (renderProps.isActive ? "accent" : "auto")
            ],
            typeof linkProps.className === "function" ? linkProps.className(renderProps) : linkProps.className
        );


        const finalProps = {
            ...linkProps,
            className: finalClassName,
            onClick: handleClick,
        };

        return (
            <NavLink { ...finalProps }>
                { children }
            </NavLink>
        );
    }
    else if(props.as === "Link"){
        const { as, variant, tone, disabled, children, ...linkProps } = props;

        const finalProps = {
            ...linkProps,
            className: cn(
                isDisabled && "cursor-not-allowed",
                "focus-visible-ring",
                linkProps.className, 
                selectedVariant, 
                tones[tone ?? "auto"]
            ),
            onClick: handleClick,
        };

        return (
            <Link { ...finalProps }>
                { children }
            </Link>
        );
    }

    const { as, variant, tone, disabled, children, ...linkProps } = props;

    const finalProps = {
        ...linkProps,
        className: cn( 
            isDisabled && "cursor-not-allowed",
            "focus-visible-ring",
            linkProps.className, 
            selectedVariant, 
            tones[tone ?? "auto"]
        ),
        onClick: handleClick,
    }

    return (
        <a { ...finalProps }>
            { children }
        </a>
    );
}

