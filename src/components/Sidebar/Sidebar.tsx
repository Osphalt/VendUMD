import React from "react";
import MachineView from "./MachineView/MachineView";
import "./Sidebar.css"
type Props = {
    //Will be changed to JSON instead of String
    parameter: string;
};
const Sidebar = (props : Props) => {
    return (
        <div id="Sidebar">
            Sidebar
            <MachineView parameter={props.parameter}/>
        </div>
    )
}
export default Sidebar;
