import {useContext} from "react";
import "./Machine.css"
import DataContext from "../../../context/DataContext";
import ActiveContext from "../../../context/ActiveContext";

export default function Machine({machine}){
    const data = useContext(DataContext)
    const {active, setActive} = useContext(ActiveContext)

    const contents = active.machine == machine.id ? (<ul id="Contents" className="">
        {machine.contents.map((contentID) => {
            return <p key={contentID} className="font-1rem">{data.contents[contentID].name}</p>
        })}
    </ul>) : <></>

    return (
        <div id="MachineView">
            <div className="MachineMenu item" onClick={() => setActive({location: active.location, machine: active.machine == machine.id ? null : machine.id})}>
                <h4>{machine.name}</h4>
            </div>
            {contents}
        </div>
    );
}