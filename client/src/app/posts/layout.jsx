import NavBar from "@/components/NavBar/page";
import { Fragment } from "react";

export default function DashboardLayout({
    children, 
}) {
    return (
        <Fragment>
            <NavBar />
            {children}
        </Fragment>
    )
}