import {useContext} from "react";
import "./Machine.css"
import ActiveContext from "../../../context/ActiveContext";

export default function Machine({machine, contents}){
    const {active, setActive} = useContext(ActiveContext)

    const contentItems = active.machine == machine.id ? (<ul id="Contents" className="">
        {machine.contents.map((contentID) => {
            return <p key={contentID} className="font-1rem">{contents[contentID].name}</p>
        })}
    </ul>) : <></>

    return (
        <div id="MachineView">
            <div className={`MachineMenu item ${active.machine == machine.id ? "selected-bg" : ""}`} onClick={() => setActive({location: active.location, machine: active.machine == machine.id ? null : machine.id})}>
                <h4 className={`font-bold ${active.machine == machine.id ? "selected-text" : ""}`}>{machine.name}</h4>
            </div>
            {contentItems}
        </div>
    );
}