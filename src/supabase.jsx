import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Data object containing initial data from VendUMD Database
 * @typedef {Object} Data
 * @property {Location[]} locations
 * @property {Machine[]} machines
 * @property {Content[]} contents
 */

/** @returns {Data} */
export async function loadData() {
    async function getLocations() {
        const {data} = await supabase.from("locations").select()
    
        return data
    }
    async function getMachines() {
        const {data} = await supabase.from("machines").select()
    
        return data
    }
    async function getContents() {
        const {data} = await supabase.from("contents").select()
    
        return data
    }

    const locations = await getLocations()
    const machines = await getMachines()
    const contents = await getContents()

    return {locations: locations ?? [], machines: machines ?? [], contents: contents ?? []}
  }

  /** @returns {{session: Session}}*/
  export async function getSession() {
    const {data} = await supabase.auth.getSession()

    return data
  }