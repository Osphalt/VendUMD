import {useState} from "react";
import "./Machine.css"

export default function MachineView(){
    //The number of machines can be dynamically assigned 
    //when JSON file is ready
    const [show, setShow] = useState(false);
    const [showDetails, setShowDetails] = useState(Array.from({ length: 2 }, (_, index) => ({ id: index, state: false })));

    function setClassName() {
        return show ? "MachineShow" : "MachineHide";
    }

    function toggleDetails(index) {
        const updatedShowDetails = [...showDetails];
        updatedShowDetails[index].state = !updatedShowDetails[index].state;
        setShowDetails(updatedShowDetails);
    }

    function setClassNameDetails(index) {
        return showDetails[index].state ? "MachineDetailsShow" : "MachineDetailsHide";
    }

    const renderMachines = showDetails.map((item) => (
        <div key={item.id}>
            <div
                className="OneMachine"
                id={item.id.toString()}
                onClick={() => toggleDetails(item.id)}
            >
                Machine {item.id + 1}
            </div>
            <div className={setClassNameDetails(item.id)}>
                <div id="Direction">Direction: Straight ahead and keep going</div>
                <div id="Content">
                    <p>Dorito</p>
                    <p>Coca Cola</p>
                    <p>Hershey Bar</p>
                </div>
                <div id="Review">
                    Rating: 5
                    Review: its alright
                </div>
            </div>
        </div>
    ));

    return (
        <div id="MachineView">
            <div className="MachineMenu"
                onClick={() => setShow(!show)}>
                <h3>Machine View</h3>
            </div>
            <div id="Machines" className={setClassName()}>
                {renderMachines}
            </div>
        </div>
    );
}