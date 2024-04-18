import {useContext} from "react";
import "./Machine.css"
import ActiveContext from "../../../context/ActiveContext";

export default function Machine({machine}){
    const {active, setActive} = useContext(ActiveContext)

    const contentItems = (active.machine == machine.id && machine.contents.length > 0) ? (<ul id="Contents" className="">
        {machine.contents.map((content) => {
            return <p key={content.id} className="font-1rem">{content.name}</p>
        })}
    </ul>) : <></>

    return (
        <div id="MachineView">
            <div className={`MachineMenu item align-items-center ${active.machine == machine.id ? "selected-bg" : ""}`} onClick={() => setActive({location: active.location, machine: active.machine == machine.id ? null : machine.id})}>
                <h4 className={`font-bold ${active.machine == machine.id ? "selected-text" : ""}`}>{machine.name}</h4>
                <p className={`ml-auto m-0 p-8 font-bold ${active.machine == machine.id ? "selected-text" : ""}`}>{machine.contents.length}</p>
            </div>
            {contentItems}
        </div>
    );
}