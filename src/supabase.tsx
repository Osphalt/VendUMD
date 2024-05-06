import { createClient } from "@supabase/supabase-js"


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

//load data function
export async function loadData(): Promise<Data> {
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
    async function getContents(){
        const {data, error} = await supabase.from("contents").select()

        if(!data || error) return []
    
        return data
    }

    const locations: VendData.Location[] = await getLocations()
    const machines = await getMachines()
    const contents = await getContents()

    return new Data([])
  }