/// <reference types="vite/client" />

//db data types
interface VendLocation {
    id: bigint
    name: string
    directions: string
    position: Position
    machines: Machine[]
}
  
type Position = [
    x: number,
    y: number
]
  
interface Machine {
    id: bigint
    name: string
    location: bigint
    contents: Content[]
    reviews: bigint[]
}

interface Content {
    id: bigint
    name: string
    type: "drink" | "snack" | "health"
}

namespace VendData { 
    interface Location {
        id: bigint
        name: string
        directions: string
        position: Position
        machines: bigint[]
    }
      
    interface Machine {
        id: bigint
        name: string
        location: bigint
        contents: bigint[]
        reviews: bigint[]
    }
}

class Data {
    constructor(public locations: VendLocation[])
}

//component data types
type Active = {
    location: bigint | null
    machine: number | null
}