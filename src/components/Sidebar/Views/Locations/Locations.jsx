import { useContext, useEffect, useState } from "react"
import { supabase } from "../../../../supabase"
import ActiveContext from "../../../context/ActiveContext"

function Location({location, onClick, active}) {
    const [machines, setMachines] = useState([])

    useEffect(() => {
        async function getMachines() {
            const {data} = await supabase.from("machines").select().eq("location", location.id)
            setMachines(data)
        }

        if(active) {
            getMachines()
        } else {
            setMachines([])
        }
    }, [active, location])

    const machineItems = machines.length == 0 ? <></> : (<ul>
        {machines.map((machine) => {
            return <li key={machine.id}>{machine.name ?? "None"}</li>
        })}
    </ul>)

    return (<li onClick={onClick}>
        <div className={`item ${active ? "selected" : ""}`}>
            <p className="item-text">{location.name}</p>
        </div>
        {machineItems}
    </li>)
}

export default function Locations({locations, setActive}) {
    const active = useContext(ActiveContext)

    function onLocationClick(id) {
        setActive(id)
    }

    const locationItems = locations.map((location) => {
        return <Location key={location.id} onClick={() => {onLocationClick(location.id)}} location={location} active={active == location.id ? true : false}/>
    })
    
    return (<div className="flex-col gap-8 w-fill h-fill align-items-center">
        <h3>Locations</h3>
        <ul className="flex-col gap-4 p-16 w-80 list-overflow list-none">
            {locationItems}
        </ul>
    </div>)
}