import { createContext } from "react";

const ActiveContext = createContext({active: null, setActive: function(newActive) {this.active = newActive} })

export default ActiveContext