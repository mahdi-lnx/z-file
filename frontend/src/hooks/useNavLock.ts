
import { NavLock } from "../components/providers/NavLockProvider"
import { useContext } from "react"


/**
 * Reads the value provided by the closest NavLockProvider ansector
 */
export const useNavLock = () => {

    const navLock = useContext(NavLock);

    if(navLock === null){
        throw new Error("useTheme could not find a NavLockProvider ancestor");
    }

    return navLock;
}

