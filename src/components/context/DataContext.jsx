import { createContext } from "react";

/**
 * @typedef {Object} Data
 * @property {Locations[]} locations
 * @property {Machines[]} machines
 */

/**@type {Data} */
const DataContext = createContext({locations: [], machines: []})

export default DataContext