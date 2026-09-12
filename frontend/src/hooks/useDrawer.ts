
import { useCallback, useState } from "react"


export type DrawerController = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
};


export const useDrawer = (initialState=false): DrawerController => {

    const [ isOpen, setOpen ] = useState<boolean>(initialState);

    const open = useCallback(() => {
        setOpen(() => true);
    }, []);

    const close = useCallback(() => {
        setOpen(() => false);
    }, []);

    const toggle = useCallback(() => {
        setOpen((prevState) => !prevState);
    }, []);

    return {
        isOpen,
        open,
        close,
        toggle,
    };
}

