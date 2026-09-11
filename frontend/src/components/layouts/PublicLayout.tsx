
import type { ReactElement } from "react"
import { Outlet } from "react-router"
import { AppHeader } from "../headers/AppHeader";


export const PublicLayout = (): ReactElement => {

    return (
        <>
            <AppHeader logo={{
                to: ".",
            }}/>

            <main>
                <Outlet/>
            </main>
        </>
    );
}

