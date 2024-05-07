import { useContext,useMemo} from "react";
import "./Locations.css";
import DataContext from "../../../context/DataContext";
import {ActiveContext} from "../../../context/ActiveContext";
import Machine from "../Machine/Machine.tsx"
import {QueryContext} from "../../../context/QueryContext.tsx";
import { filterLocationsByQuery} from "../../../../supabase.tsx";

interface LocationProps {location: VendLocation}

function Location({location}: LocationProps) {
    const [active, setActive] = useContext(ActiveContext)

    const machineItems = (active.location == location.id && location.machines.length > 0) ? (<ul className="MachineDetailsShow flex-col gap-8">
            {location.machines.map((machine) => <Machine key={machine.id} machine={machine}/>)}
        </ul>) : <></>

    const directions = active.location == location.id ? (
        <p className="p-4"><span className="font-bold">Directions: </span>{location.directions}</p>
    ) : <></>

    return(<li className="OneLocation">
            <div className={`LocationName ${active.location == location.id ? "selected-bg" : ""}`} onClick={() => setActive({location: active.location == location.id ? null : location.id, machine: null})}>
                <h3 className={`font-bold ${active.location == location.id ? "selected-text" : ""}`}>{location.name}</h3>
            </div>
            {directions}
            {machineItems}
        </li>)
}

export default function Locations() {
    const data = useContext(DataContext)
    const [query] = useContext(QueryContext)
    const visibleLocations = useMemo(() => filterLocationsByQuery(data, query), [data, query])
    
    const locationItems = visibleLocations.map((location) => <Location key={location.id} location={location}/>) 
    const notfound = <p className={`${locationItems.length > 0 ? "invisible" : ""}`}>No results found for your query</p>

    return (
        <div id="LocationView" className="h-fill w-fill overflow-clip">
            <div className="LocationMenu">
                <h2>Locations</h2>
            </div>
            <ul id="Locations" className="MachineShow h-fill list-none list-overflow scrollbar">
                {locationItems}
                {notfound}
            </ul>
        </div>
    );
}
