import {Outlet} from "react-router-dom";
import * as React from "react";
import {Container} from "@mui/material";

const ContainerLayout = (): React.ReactElement => {
    return (
        <Container maxWidth={'lg'}>
            <Outlet/>
        </Container>
    )
}

export default ContainerLayout
