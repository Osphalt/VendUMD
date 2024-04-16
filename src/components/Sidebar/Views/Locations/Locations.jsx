import { useContext} from "react";
import "./Locations.css";
import DataContext from "../../../context/DataContext";
import ActiveContext from "../../../context/ActiveContext";
import Machine from "../Machine/Machine.jsx"

//In-Component Machine - Old
// function Machine({machine}) {
//     const {active, setActive} = useContext(ActiveContext)

//     return (<li className="MachineButton" onClick={() => setActive({location: active.location, machine: active.machine == machine.id ? null : machine.id})}>
//             {machine.name}
//             {active.machine === machine.id && (
//                 <div className="MachineInfo">
//                     <div>Contents: {machine.contents.join(', ')}</div>
//                     <div>{machine.reviews}</div>
//                 </div>
//             )}
//         </li>)
// }

function Location({location, machines}) {
    const {active, setActive} = useContext(ActiveContext)

    const machineItems = active.location == location.id ? (<ul className="MachineDetailsShow flex-col gap-8">
            {machines.map((machine) => <Machine key={machine.id} machine={machine}/>)}
        </ul>) : <></>

    const directions = active.location == location.id ? (
        <p>{location.directions}</p>
    ) : <></>

    return(<li className="OneLocation">
            <div className="LocationName" onClick={() => setActive({location: active.location == location.id ? null : location.id, machine: null})}>
                <h3 className="font-bold">{location.name}</h3>
            </div>
            {directions}
            {machineItems}
        </li>)
}

export default function Locations() {
    const data = useContext(DataContext)

    const locationItems = data.locations.map((location) => <Location key={location.id} location={location} machines={data.machines.filter((machine) => location.machines.includes(machine.id) ? true : false)}/>)
        

    return (
        <div id="LocationView" className="w-fill overflow-clip">
            <div className="LocationMenu">
                <h2>Locations</h2>
            </div>
            <ul id="Locations" className="MachineShow list-none list-overflow scrollbar">
                {locationItems}
            </ul>
        </div>
    );
}
