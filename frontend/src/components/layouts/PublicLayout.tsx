
import type { ReactElement } from "react"
import { Outlet } from "react-router"


export const PublicLayout = (): ReactElement => {

    return (
        <>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

