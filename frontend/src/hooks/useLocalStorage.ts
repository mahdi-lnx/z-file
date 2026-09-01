
import { useContext } from "react"
import { LocalStorage } from "../components/providers/LocalStorageProvider.tsx"

/**
 * A custom hook to read the storage provided by the LocalStorageProvider
 */
export const useLocalStorage = ()=> {
    // ts auto passes LocalStorageContextValue | null to useContext
    const value = useContext(LocalStorage);

    if(value === null){
        throw new Error("useLocalStorage could not find a LocalStorageProvider ancestor");
    }

    return value;
}

