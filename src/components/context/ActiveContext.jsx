import { createContext } from "react";

const ActiveContext = createContext({active: {location: null, machine: null}, setActive: function(newActive) {this.active = newActive} })

export default ActiveContext