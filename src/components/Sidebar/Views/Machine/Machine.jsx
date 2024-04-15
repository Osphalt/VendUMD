import {useContext} from "react";
import "./Machine.css"
import DataContext from "../../../context/DataContext";


export default function Machine({machine}){
    const data = useContext(DataContext)

    const contents = machine.contents.map((contentID) => {
        return <p key={contentID}>{data.contents[contentID].name}</p>
    })

    return (
        <div id="MachineView">
            <div className="MachineMenu">
                <h3>{machine.name}</h3>
            </div>
            <ul id="Contents" className="">
                {contents}
            </ul>
        </div>
    );
}