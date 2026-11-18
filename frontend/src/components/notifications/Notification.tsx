
import { useState, type ReactElement, type ReactNode } from "react"
import { cn } from "../../utils/general"
import { HamburgerButton } from "../buttons/HamburgerButton"

type NotificationTones = {
    info: string;
    success: string;
    warning: string;
    error: string;
};

type NotificationAnimation = "animate-notification-open" | "animate-notification-close";

type NotificationProps = {
    tone?: keyof NotificationTones;
    children: ReactNode;
    onClose?: () => void;
    className?: string;
};


export const Notification = ({ tone="info", children, className, onClose }: NotificationProps): ReactElement => {

    const [ animation, setAnimation ] = useState<NotificationAnimation>("animate-notification-open");

    const tones: NotificationTones = {
        info: cn(
            "text-info",
            "border-info/77",
        ),
        success: cn(
            "text-success",
            "border-success/77",
        ),
        warning: cn(
            "text-warning",
            "border-warning/77",
        ),
        error: cn(
            "text-danger",
            "border-danger/77",
        ),
    };

    const selectedTone = tones[tone];

    return (
        <section className={cn(
            "border-2",
            "p-7",
            "rounded-sm",
            "bg-light",
            "dark:bg-neutral-900",
            "w-sm",
            "flex",
            "flex-col",
            "gap-5",
            "relative",
            selectedTone,
            animation,
            className,
        )} onAnimationEnd={event => event.animationName === "notification-close" && onClose?.()}>

            <HamburgerButton tone="mist" size="xs" isOpen={true} className={cn(
                "absolute",
                "top-0",
                "right-7",
            )} onClick={() => setAnimation("animate-notification-close")}/>

            <h3 className={cn(
                "text-xl",
                "font-semibold",
            )}>
                { tone[0].toUpperCase() + tone.slice(1) }
            </h3>

            <p className={cn(
                "text-dark",
                "dark:text-light",
                "text-lg",
                "font-medium",
            )}>
                { children }
            </p>
        </section>
    );
}

