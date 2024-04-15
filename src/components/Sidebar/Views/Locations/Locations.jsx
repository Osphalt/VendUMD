import { useContext} from "react";
import "./Locations.css";
import DataContext from "../../../context/DataContext";
import ActiveContext from "../../../context/ActiveContext";

export default function LocationView() {
    const data = useContext(DataContext)
    const {active, setActive} = useContext(ActiveContext)

    function toggleLocationDetails(locationId) {
        setActive({location: active.location == locationId ? null : locationId, machine: null})
    }

    function toggleMachineDetails(machineId) {
        setActive({location: active.location, machine: active.machine == machineId ? null : machineId})
    }

    const renderMachines = (locationId, machines) => {
        return (
            <div className="MachineDetailsShow">
                {machines.map((machine) => (
                    <button key={machine.id} className="MachineButton" onClick={() => toggleMachineDetails(machine.id)}>
                        {machine.id}
                        {active.machine === machine.id && (
                            <div className="MachineInfo">
                                <div>Direction: {machine.directions}</div>
                                <div>Contents: {machine.contents.join(', ')}</div>
                                <div>{machine.reviews}</div>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div id="LocationView">
            <div className="MachineMenu">
                <h3>Location View</h3>
            </div>
            <div id="Locations" className="MachineShow">
                {data.locations.map((location) => (
                    <div key={location.id} className="OneLocation">
                        <div
                            className="LocationName"
                            onClick={() => toggleLocationDetails(location.id)}
                        >
                            {location.name}
                        </div>
                        {active.location === location.id && renderMachines(location.id, data.machines.filter((machine) => location.machines.includes(machine.id) ? true : false))}
                    </div>
                ))}
            </div>
        </div>
    );
}
