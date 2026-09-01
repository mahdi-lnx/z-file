
import { Theme } from "../components/providers/ThemeProvider"
import { useContext } from "react"


/**
 * Reads the value provided by the closest ThemeProvider ansector
 */
export const useTheme = () => {
    const theme = useContext(Theme);

    if(theme === null){
        throw new Error("useTheme could not find a ThemeProvider ancestor");
    }

    return theme;
}

