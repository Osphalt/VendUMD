import { useState } from "react";
import "./Locations.css";

export default function LocationView() {
    const locations = [
        {
            id: 1,
            locName: "CASL Lobby",
            machines: [
                { id: 'Machine 1', direction: "Straight ahead", content: ["Dorito", "Coca Cola", "Hershey Bar"], review: "Rating: 5. Review: It's alright" },
                { id: 'Machine 2', direction: "To the left", content: ["Water", "Sprite", "Twix"], review: "Rating: 4. Review: Pretty good" },
            ],
            
        },
        {
          id: 2,
          locName: "RUC 2F Walkway",
          machines: [
              { id: 'Machine 3', direction: "To the right", content: ["Pepsi", "Fanta", "Mars Bar"], review: "Rating: 3. Review: Average" },
              { id: 'Machine 4', direction: "Straight and to the right", content: ["Juice", "Lemonade", "Snickers"], review: "Rating: 4. Review: Good choices" },
          ],
      },
      // More locations...
    ];

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [activeMachine, setActiveMachine] = useState({});

    function toggleLocationDetails(locationId) {
        setSelectedLocation(selectedLocation === locationId ? null : locationId);
        setActiveMachine({});
    }

    function toggleMachineDetails(locationId, machineId) {
        const isActive = activeMachine[locationId] === machineId;
        setActiveMachine({ ...activeMachine, [locationId]: isActive ? null : machineId });
    }

    const renderMachines = (locationId, machines) => {
        return (
            <div className="MachineDetailsShow">
                {machines.map((machine) => (
                    <button key={machine.id} className="MachineButton" onClick={() => toggleMachineDetails(locationId, machine.id)}>
                        {machine.id}
                        {activeMachine[locationId] === machine.id && (
                            <div className="MachineInfo">
                                <div>Direction: {machine.direction}</div>
                                <div>Contents: {machine.content.join(', ')}</div>
                                <div>{machine.review}</div>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div id="LocationView">
            <div className="MachineMenu" onClick={() => setSelectedLocation(null)}>
                <h3>Location View</h3>
            </div>
            <div id="Locations" className="MachineShow">
                {locations.map((location) => (
                    <div key={location.id} className="OneLocation">
                        <div
                            className="LocationName"
                            onClick={() => toggleLocationDetails(location.id)}
                        >
                            {location.locName}
                        </div>
                        {selectedLocation === location.id && renderMachines(location.id, location.machines)}
                    </div>
                ))}
            </div>
        </div>
    );
}
