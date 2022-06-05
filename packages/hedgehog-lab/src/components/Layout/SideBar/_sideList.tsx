import SideListItem, {SideListItemProps} from "./_sideListItem";
import * as React from "react";

interface SideListProps {
    data: SideListItemProps[]
}

const SideList: React.FC<SideListProps> = (props) => {
    const {data} = props;
    return (
        <>
            {data.map((item, index) =>
                <SideListItem key={index} link={item.link} icon={item.icon} text={item.text}/>
            )}
        </>
    )
}

export default SideList;
