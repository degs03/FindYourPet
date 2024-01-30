import Map from "@/components/Map/page";
import NavBar from "@/components/NavBar/page";
import { Box } from "@mui/material";
import { Fragment } from "react";

export default function Home() {

    return (
        <Fragment>
            <NavBar />
            <Map />
        </Fragment>
    );
}
