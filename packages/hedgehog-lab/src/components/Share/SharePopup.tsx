import {ShareOutlined} from "@mui/icons-material";
import {IconButtonProps, Tab, Tabs} from "@mui/material";
import {Box} from "@mui/system";
import * as React from "react";
import CopyInput from "../Base/Input/Copy/CopyInput";
import BasePopupButton from "../Base/Popup/BasePopupButton";

interface ISharePopupProps {
    url: string;
    script: string;
    embed: string;
    size?: IconButtonProps["size"];
    type?: "button" | "icon";
    text?: string
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 1}}>{children}</Box>}
        </div>
    );
};

const SharePopup: React.FC<ISharePopupProps> = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <BasePopupButton text={props.text} type={props.type} size={props.size} icon={<ShareOutlined/>}>
                <Box>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label={"Script"}/>
                        <Tab label={"URL"}/>
                        <Tab label={"Embed"}/>
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <CopyInput url={`*${props.script}`}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <CopyInput url={encodeURIComponent(props.url)}/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <CopyInput
                            url={`<iframe src='${encodeURIComponent(props.embed)}' width='100%' height='100%' />`}/>
                    </TabPanel>
                </Box>
            </BasePopupButton>
        </>
    );
};
export default SharePopup;
