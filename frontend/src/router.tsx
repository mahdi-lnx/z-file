
import { createBrowserRouter } from "react-router"
import { PublicLayout } from "./components/layouts/PublicLayout.tsx"
import { Homepage } from "./components/pages/Homepage.tsx"

export const router = createBrowserRouter([
    {
        Component: PublicLayout,
        children: [
            {
                index: true,
                Component: Homepage,
            },
        ],
    },
]);

