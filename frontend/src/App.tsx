
import { RouterProvider } from "react-router/dom";
import { LocalStorageProvider } from "./components/providers/LocalStorageProvider.tsx"
import { router } from "./router.tsx"
import { ThemeProvider } from "./components/providers/ThemeProvider.tsx"


export const App = () => {

    return (
        <LocalStorageProvider>
            <ThemeProvider>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </LocalStorageProvider>
    );
}

