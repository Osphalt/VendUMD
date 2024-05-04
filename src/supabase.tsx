import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

//data types
type Location = {
    id: bigint
    name: string
    directions: string
    position: Position
    machines: number[]
}

type Position = {
    x: number
    y: number
}

type Machine = {
    id: bigint
    name: string
    location: number
    contents: number[]
    reviews: number[]
}

type Content = {
    id: bigint
    name: string
    type: "drink" | "snack" | "health"
}

type Data = {
    locations: Location[]
    machines: Machine[]
    contents: Content[]
}

//load data function
export async function loadData() {
    const supaData: Data = {locations: [], machines: [], contents: []}

    async function getLocations() {
        const {data, error} = await supabase.from("locations").select()

        if(!data || error) return []
    
        return data
    }
    async function getMachines() {
        const {data, error} = await supabase.from("machines").select()

        if(!data || error) return []
    
        return data
    }
    async function getContents() {
        const {data, error} = await supabase.from("contents").select()

        if(!data || error) return []
    
        return data
    }

    supaData.locations = await getLocations()
    supaData.machines = await getMachines()
    supaData.contents = await getContents()

    return supaData
  }