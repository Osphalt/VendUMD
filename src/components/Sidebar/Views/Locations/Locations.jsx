import { useContext} from "react"
import ActiveContext from "../../../context/ActiveContext"
import DataContext from "../../../context/DataContext"

function Content({content}) {
    return (<li className="item m-2 w-80">
        <p className="item-text">{content.name ?? "None"}</p>
    </li>)
}

function Machine({machine}) {
    const data = useContext(DataContext)
    const {active, setActive} = useContext(ActiveContext)

    const contents = active.machine == machine.id ? (<ul className="flex-col list-none align-items-end">
        {data.contents.map((content) => machine.contents?.includes(content.id) ? <Content key={content.id} content={content}/> : <></>)}
    </ul>) : <></>

    return (<li className="w-80">
        <div className={`item m-2 ${active.machine == machine.id ? "selected" : ""}`} onClick={() => setActive({location: active.location, machine: active.machine == machine.id ? null : machine.id})}>
            <p className="item-text">{machine.name ?? "None"}</p>
        </div>
        {contents}
    </li>)
}

function Location({location, machines}) {
    const {active, setActive} = useContext(ActiveContext)

    const machineItems = active.location == location.id ? (<ul className="flex-col list-none align-items-end">
        {machines.map((machine) => <Machine key={machine.id} machine={machine}/>)}
    </ul>) : <></>

    const directions = active.location == location.id ? <p><span className="item-text font-bold">Directions: </span>{location.directions}</p> : <></>

    return (<li >
        <div className={`item p-2 m-2 ${active.location == location.id ? "selected" : ""}`} onClick={() => setActive({location: active.location == location.id ? null : location.id, machine: null})}>
            <p className="item-text">{location.name}</p>
            <p className="item-text ml-auto">{machines.length}</p>
        </div>
        {directions}
        {machineItems}
    </li>) 
}

export default function Locations() {
    const data = useContext(DataContext)

    const locationItems = data.locations?.map((location) => {
        return <Location key={location.id}  location={location} machines={data.machines.filter((machine) => machine.location == location.id ? true : false)} />
    })
    
    return (<div className="flex-col gap-8 w-fill h-fill align-items-center">
        <h3>Locations</h3>
        <ul className="flex-col gap-4 w-80 list-overflow list-none">
            {locationItems}
        </ul>
    </div>)
}