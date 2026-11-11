
import { createContext, useState, type ReactNode } from "react"

export type NotificationSystemContextValue = {
    //TODO: finish this type
    addNotification: () => void
    removeNotification: (notificationId: string) => void;

};

type NotificationSystemProviderProps = {
    children: ReactNode;
};

export const NotificationSystemContext = createContext<NotificationSystemContextValue | null>(null);

export const NotificationSystemProvider = ({ children }: NotificationSystemProviderProps) => {
    //TODO: finish this component

    const [ notifications, setNotifications ] = useState(null);

    return (
        <NotificationSystemContext value={null}>
            { children }
        </NotificationSystemContext>
    );
}

