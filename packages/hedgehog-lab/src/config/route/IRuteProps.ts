import * as React from "react";

export interface IRuteProps {
    path: string,
    element: React.ReactElement,
    children?: undefined | Array<IRuteProps>,
}
