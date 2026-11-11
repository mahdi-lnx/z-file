
import { NotificationSystemContext, type NotificationSystemContextValue } from "../components/providers/NotificationSystemProvider"
import { useContext } from "react"


/**
 * Reads the context provided by the closest NotificationSystemProvider ansector
 */
export const useNotificationSystem = (): NotificationSystemContextValue => {

    const ctx = useContext(NotificationSystemContext);

    if(ctx === null){
        throw new Error("useNotificationSystem could not find a NotificationSystemProvider ancestor", { cause: ctx, });
    }

    return ctx;
}

