
import { createContext, type ReactElement } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useMatchMedia } from "../../hooks/useMatchMedia"
import { cn } from "../../utils/general"


type Theme = "light" | "dark";


export const Theme = createContext<Theme | null>(null);


/**
 * Provides the current Theme
 */
export const ThemeProvider = (
    { children }: { children: ReactElement }  
): ReactElement => {

    const storage = useLocalStorage();

    const result = storage.getItem("theme");

    let userCustomTheme: Theme | null = null;

    if(result.success){
        if(result.value === "light" || result.value === "dark"){
            userCustomTheme = result.value;
        }
    }

    const matches = useMatchMedia({ query: "screen and (prefers-color-scheme: dark)", live: userCustomTheme === null, })

    const finalTheme: Theme = userCustomTheme ?? matches ? "dark" : "light";

    return (
        <div className={cn(finalTheme)}>
            <Theme value={finalTheme}>
                { children }
            </Theme>
        </div>
    );
}

