
import { createContext, useState, type ReactElement } from "react"


type CustomLocalStorage = {
    [key: string]: unknown;
};

type LocalStorageLookupResult = { success: false; } | { success: true; value: unknown };

type LocalStorageContextValue = {
    storage: CustomLocalStorage;
    getItem: (key:string) => LocalStorageLookupResult;
    setItem: (key: string, value: unknown) => void;
    hasItem: (key: string) => boolean;
    removeItem: (key: string) => void;
    clear: () => void;
};


export const LocalStorage = createContext<LocalStorageContextValue | null>(null);


/**
 * Provides an in memory representation of LocalStorage
 */
export const LocalStorageProvider = (
    { children }: { children: ReactElement }
) => {

    const [ storage, setStorage ] = useState<CustomLocalStorage>(() => {
        const temp: CustomLocalStorage = {};

        const badKeys: string[] = [];

        for(let i = 0; i < localStorage.length; i++){
            const key: string | null = localStorage.key(i);

            if(key == null){
                continue;
            }

            const value: string | null = localStorage.getItem(key);

            if(value === null){
                continue;
            }

            try{
                temp[key] = JSON.parse(value);
            }
            catch{
                // remove bad key for removal 
                badKeys.push(key);
            } 
        }

        // remove bad keys
        for(const badKey of badKeys){
            localStorage.removeItem(badKey);
        }

        return temp;
    });

    const getItem = (key: string): LocalStorageLookupResult => {
        if(!hasItem(key)){
            return { 
                success: false, 
            };
        }

        return {
            success: true,
            value: storage[key],
        };
    }

    const hasItem = (key: string): boolean => {
        return Object.hasOwn(storage, key);
    }

    const removeItem = (key: string): void => {
        setStorage((prevStorage: CustomLocalStorage): CustomLocalStorage => {
            const { [key]: _, ...newStorage } = prevStorage;

            return newStorage;
        });

        localStorage.removeItem(key);
    }

    const setItem = (key: string, value: unknown): void => {

        const finalValue: string | undefined = JSON.stringify(value);

        if(finalValue === undefined){
            throw new Error("Invalid value to stringify as JSON", { cause: value });
        }

        setStorage((prevStorage: CustomLocalStorage): CustomLocalStorage => {
            return {
                ...prevStorage,
                [key]: finalValue,
            };
        });

        localStorage.setItem(key, finalValue);
    }

    const clear = (): void => {
        setStorage({});

        localStorage.clear();
    }

    return (
        <LocalStorage value={{
            storage,
            getItem,
            setItem,
            hasItem,
            removeItem,
            clear,
        }}>
            { children }
        </LocalStorage>
    );
}

