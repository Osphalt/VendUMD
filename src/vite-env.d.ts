/// <reference types="vite/client" />

//Application data types
type Active = {
    location: number | null
    machine: number | null
}

type VendLocation = {
    id: number
    name: string
    directions: string
    position: Position
    machines: Machine[]
}
  
type Position = [
    x: number,
    y: number
]
  
type Machine = {
    id: number
    name: string
    location: number
    contents: Content[]
    reviews: number[]
}

type Content = {
    id: number
    name: string
    type: ContentType
}

type ContentType = "drink" | "snack" | "health"


//Database data types
declare namespace DB { 
    type Data = {
        locations: Location[]
        machines: Machine[]
        contents: Content[]
    }

    type Location = {
        id: number
        name: string
        directions: string
        position: Position
        machines: number[]
    }
      
    type Machine = {
        id: number
        name: string
        location: number
        contents: number[]
        reviews: number[]
    }
}
