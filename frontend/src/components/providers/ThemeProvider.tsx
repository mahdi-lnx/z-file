
import { createContext, type ReactElement } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useMatchMedia } from "../../hooks/useMatchMedia"
import { cn } from "../../utils/general"


type Theme = "light" | "dark";

type ThemeContextValue = {
    theme: Theme;
    setTheme: (newTheme: Theme) => void;
};


export const Theme = createContext<ThemeContextValue | null>(null);


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

    const setTheme = (newTheme: Theme): void => storage.setItem("theme", newTheme);

    return (
        <div className={cn(finalTheme)}>
            <Theme value={{
                theme: finalTheme,
                setTheme,
            }}>
                { children }
            </Theme>
        </div>
    );
}

