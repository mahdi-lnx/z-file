
import { RouterProvider } from "react-router/dom"
import { LocalStorageProvider } from "./components/providers/LocalStorageProvider.tsx"
import { router } from "./router.tsx"
import { ThemeProvider } from "./components/providers/ThemeProvider.tsx"
import { NavLockProvider } from "./components/providers/NavLockProvider.tsx"


export const App = () => {

    return (
        <LocalStorageProvider>
            <ThemeProvider>
                <NavLockProvider>
                    <RouterProvider router={router}/>
                </NavLockProvider>
            </ThemeProvider>
        </LocalStorageProvider>
    );
}

