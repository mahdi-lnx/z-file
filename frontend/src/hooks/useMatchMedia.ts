
import { useEffect, useEffectEvent, useState } from "react"

type Config = {
    query: string;
    live?: boolean;
    onChange?: (matches: boolean) => void;
};

/**
 * An enhasive wrapper around the matchMedia api
 */
export const useMatchMedia = ({ query, live = true, onChange }: Config): boolean => {
    const [ matches, setMatches ] = useState<boolean>(() => matchMedia(query).matches);


    const fn = useEffectEvent((matches: boolean) => {
        onChange?.(matches);
    });

    useEffect(() => {
        const mediaQueryList = matchMedia(query);

        // needed when the query changes
        setMatches(mediaQueryList.matches);

        const handleChange = ({ matches }: MediaQueryListEvent): void => {
            setMatches(matches);
            fn(matches);
        }

        if(live){
            mediaQueryList.addEventListener("change", handleChange);
        }

        return () => {
            live && mediaQueryList.removeEventListener("change", handleChange);
        }

    }, [ query, live ])

    return matches;
}

