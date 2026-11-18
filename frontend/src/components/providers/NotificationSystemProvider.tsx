
import { createContext, useState, type ReactNode } from "react"
import type { NotificationTones } from "../notifications/Notification"

type Notification = {
    id: string;
    type: keyof NotificationTones
    message: string;
    displayDuration?: number;
};

export type NotificationSystemContextValue = {
    addNotification: (newNotification: Notification) => void
    removeNotification: (notificationId: Notification["id"]) => void;

};

export const NotificationSystemContext = createContext<NotificationSystemContextValue | null>(null);

type NotificationSystemProviderProps = {
    children: ReactNode;
};

export const NotificationSystemProvider = ({ children }: NotificationSystemProviderProps) => {
    //TODO: finish this component

    const [ notifications, setNotifications ] = useState<Notification[]>([]);

    const addNotification: NotificationSystemContextValue["addNotification"] = (newNotification: Notification) => {
        //TODO: finish this function
    }

    const removeNotification: NotificationSystemContextValue["removeNotification"] = (notificationId: string) => {
        setNotifications(prevNotifications => 
            prevNotifications.filter(prevNotification =>
                prevNotification.id !== notificationId 
            )
        );
    }

    return (
        <NotificationSystemContext value={{
            addNotification,
            removeNotification,
        }}>
            { children }
        </NotificationSystemContext>
    );
}

