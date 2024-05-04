import { createContext } from "react";

/**
 * Data object containing initial data from VendUMD Database
 * @typedef {Object} Data
 * @property {Location[]} locations
 * @property {Machine[]} machines
 * @property {Content[]} contents
 */

/**@type {Data} */
const DataContext = createContext({locations: [], machines: [], contents: []})

export default DataContext