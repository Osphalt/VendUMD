import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

/**Load location data from supabase database */
export async function loadData(): Promise<DB.Data> {
    async function getLocations(): Promise<DB.Location[]> {
        const {data, error} = await supabase.from("locations").select()

        if(!data || error) return []
    
        return data
    }
    async function getMachines(): Promise<DB.Machine[]> {
        const {data, error} = await supabase.from("machines").select()

        if(!data || error) return []
    
        return data
    }
    async function getContents(): Promise<Content[]> {
        const {data, error} = await supabase.from("contents").select()

        if(!data || error) return []
    
        return data
    }

    const locations = await getLocations()
    const machines = await getMachines()
    const contents = await getContents()

    return {locations, machines, contents}
}

/**Computes VendLocation list from raw database data - needed to avoid issues with deep cloning */
export function getVendLocations(data: DB.Data): VendLocation[] {
    function getMachinesByLocation(location: DB.Location): Machine[] {
        return location.machines.map((machineID) => {
            const copyMachine = data.machines[machineID]
            const machine: Machine = {
                id: copyMachine.id,
                name: copyMachine.name,
                location: copyMachine.location,
                contents: copyMachine.contents.map((contentID) => Object.assign({},data.contents[contentID])),
                reviews: copyMachine.reviews
            }
            machine.contents = machine.contents.filter((content) => content && Object.keys(content).length > 0)
            return machine
        })
    }

    const VendLocations = data.locations.map((location) => {
        const vendLocation: VendLocation = {
            id: location.id,
            name: location.name,
            directions: location.directions,
            position: location.position,
            machines: getMachinesByLocation(location)
        }
        return vendLocation
    })

    return VendLocations
}


/**Filter locations by query - moved from query context for faster refresh support */
export function filterLocationsByQuery(data: VendLocation[] | DB.Data, query: string): VendLocation[] {
    const vendLocations = Array.isArray(data) ? data : getVendLocations(data) 

    function searchLocation(location: VendLocation){
        if(!location) return false
        if(query == "") return true

        if(location.name.toLowerCase().includes(query)) return true
        if(location.directions.toLowerCase().includes(query)) return true

        //search machines
        location.machines = location.machines.filter(searchMachine)
        if(location.machines.length > 0) return true

        return false
    }

    function searchMachine(machine: Machine){
        if(!machine) return false
        if(query == "") return true

        if(machine.name.toLowerCase().includes(query)) return true

        //filter contents        
        machine.contents = machine.contents.filter((content) => (content.name?.toLowerCase().includes(query) || content?.type.includes(query)))
        if(machine.contents.length > 0) return true

        return false
    }

    return vendLocations.filter(searchLocation)
}