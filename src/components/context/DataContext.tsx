import { createContext } from "react";

const DataContext = createContext<DB.Data>({locations: [], machines: [], contents: []})

export default DataContext