import { useContext, useEffect, useState} from "react";
import "./Locations.css";
import DataContext from "../../../context/DataContext";
import ActiveContext from "../../../context/ActiveContext";
import Machine from "../Machine/Machine.jsx"
import QueryContext from "../../../context/QueryContext.jsx";

function filterLocationsByQuery(data, query) {
    function searchLocation(location) {
        if(!location ) return false
        if(query == "") return true

        if(location.name.toLowerCase().includes(query)) return true
        if(location.directions.toLowerCase().includes(query)) return true

        //search machines
        location.machines = location.machines.filter(searchMachine)
        if(location.machines.length > 0) return true

        return false
    }

    function searchMachine(machine) {
        if(!machine) return false
        if(query == "") return true

        if(machine.name.toLowerCase().includes(query)) return true

        //filter contents        
        machine.contents = machine.contents.filter((content) => {if(content.name.toLowerCase().includes(query) || content.type == query) {return true} else {return false}})
        if(machine.contents.length > 0) return true

        return false
    }

    //filter all locations when data changes
    let filterLocations = data.locations.map((location) => {
        const newLoc = {}
        Object.assign(newLoc, location)
        newLoc.machines = data.machines.filter((machine) => newLoc.machines.includes(machine.id))
        newLoc.machines = newLoc.machines.map((machine) => {
            const newMach = {}
            Object.assign(newMach,machine)
            newMach.contents = data.contents.filter((content) => newMach.contents.includes(content.id))
            return newMach
        })
        return newLoc
    })

    filterLocations = filterLocations.filter((location) => searchLocation(location))

    return filterLocations
}

function Location({location}) {
    const {active, setActive} = useContext(ActiveContext)

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

/**
 * Data object containing initial data from VendUMD Database
 * @typedef {Object} Data
 * @property {Location[]} locations
 * @property {Machine[]} machines
 * @property {Content[]} contents
 */

export default function Locations() {
    /**@type {Data} */
    const data = useContext(DataContext)
    const {query} = useContext(QueryContext)
    const [locations, setLocations] = useState([])

    useEffect(() => {
        const filterLocations = filterLocationsByQuery(data, query)

        setLocations(filterLocations)
    }, [data, query])

    
    const locationItems = locations.map((location) => <Location key={location.id} location={location}/>) 
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
