import { useContext} from "react"
import ActiveContext from "../../../context/ActiveContext"
import DataContext from "../../../context/DataContext"

function Machine({machine}) {
    return <li className="item m-2 w-80"><p className="item-text">{machine.name ?? "None"}</p></li>
}

function Location({location, machines, onClick, active}) {
    const machineItems = active ? (<ul className="flex-col list-none align-items-end">
        {machines.map((machine) => <Machine key={machine.id} machine={machine}/>)}
    </ul>) : <></>

    return (<li onClick={onClick}>
        <div className={`item p-2 m-2 ${active ? "selected" : ""}`}>
            <p className="item-text">{location.name}</p>
            <p className="item-text ml-auto">{machines.length}</p>
        </div>
        {machineItems}
    </li>) 
}

export default function Locations() {
    const data = useContext(DataContext)
    const {active, setActive} = useContext(ActiveContext)

    const locationItems = data.locations?.map((location) => {
        return <Location key={location.id} onClick={() => setActive(location.id)} location={location} machines={data.machines.filter((machine) => machine.location == location.id ? true : false)} active={active == location.id ? true : false}/>
    })
    
    return (<div className="flex-col gap-8 w-fill h-fill align-items-center">
        <h3>Locations</h3>
        <ul className="flex-col gap-4 w-80 list-overflow list-none">
            {locationItems}
        </ul>
    </div>)
}