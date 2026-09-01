
import { RouterProvider } from "react-router/dom";
import { LocalStorageProvider } from "./components/providers/LocalStorageProvider.tsx"
import { router } from "./router.tsx"


export const App = () => {

    return (
        <LocalStorageProvider>
            <RouterProvider router={router}/>
        </LocalStorageProvider>
    );
}

