/// <reference types="vite/client" />

//db data types
namespace VendData {
    interface Location {
        id: bigint
        name: string
        directions: string
        position: Position
        machines: number[]
    }

    type Position = [
        x: number,
        y: number
    ]
    
    interface Machine {
        id: bigint
        name: string
        location: number
        contents: number[]
        reviews: number[]
    }
    
    interface Content {
        id: bigint
        name: string
        type: "drink" | "snack" | "health"
    }
}

class Data { 
    constructor(public locations: VendData.Location[], public machines: VendData.Machine[], public contents: VendData.Content[]) {}
}

class VendLocation {
    constructor(location: VendData.Location)
}

//component data types
type Active = {
    location: number | null
    machine: number | null
}