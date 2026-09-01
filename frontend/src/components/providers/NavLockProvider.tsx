
import { createContext, useState, type ReactElement } from "react"


type NavLockContextValue = {
    isLocked: boolean;
    lock: () => void;
    unlock: () => void;
};


export const NavLock = createContext<NavLockContextValue | null>(null);


export const NavLockProvider = (
    { children }: { children: ReactElement; }
): ReactElement => {

    const [ isLocked, setIsLocked ] = useState<boolean>(false);

    const lock = (): void => setIsLocked(true);

    const unlock = (): void => setIsLocked(false);

    return (
        <NavLock value={{
            isLocked,
            lock,
            unlock,
        }}>
            { children }
        </NavLock>
    );
}

