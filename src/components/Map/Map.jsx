import { useContext,useState, useEffect } from "react"
import DesktopContext from "../context/DesktopContext.jsx"
import "./Map.css"
import DataContext from "../context/DataContext.jsx"
import ActiveContext from "../context/ActiveContext.jsx"
import QueryContext from "../context/QueryContext.jsx"

function filterLocationsByQuery(data, query) {
    function searchLocation(location) {
        if(!location ) return false
        if(query == "") return true

        if(location.name.toLowerCase().includes(query)) return true
        if(location.directions.toLowerCase().includes(query)) return true

        //search machines
        location.machines = location.machines.filter(searchMachine)
        if(location.machines.length > 0) return true

        return false
    }

    function searchMachine(machine) {
        if(!machine) return false
        if(query == "") return true

        if(machine.name.toLowerCase().includes(query)) return true

        //filter contents        
        machine.contents = machine.contents.filter((content) => {if(content.name.toLowerCase().includes(query) || content.type == query) {return true} else {return false}})
        if(machine.contents.length > 0) return true

        return false
    }

    //filter all locations when data changes
    let filterLocations = data.locations.map((location) => {
        const newLoc = {}
        Object.assign(newLoc, location)
        newLoc.machines = data.machines.filter((machine) => newLoc.machines.includes(machine.id))
        newLoc.machines = newLoc.machines.map((machine) => {
            const newMach = {}
            Object.assign(newMach,machine)
            newMach.contents = data.contents.filter((content) => newMach.contents.includes(content.id))
            return newMach
        })
        return newLoc
    })

    filterLocations = filterLocations.filter((location) => searchLocation(location))

    return filterLocations
}

function MapDiv({children}) {
    const isDesktop = useContext(DesktopContext)
    return (
        <>
        {isDesktop ? (
            <div className="mapDesktop">{children}</div>
        ) : (
            <div className="mapMobile">{children}</div>
        )}
        </>
    )
}

export default function Map() {
    const data = useContext(DataContext)
    const {active, setActive} = useContext(ActiveContext)
    const {query} = useContext(QueryContext)
    const [locations, setLocations] = useState([])

    const [scale, setScale] = useState(1)
    const [translate, setTranslate] = useState([0,0])
    const [touch, setTouch] = useState({id: -1, pos: [0,0]})
    const [down, setDown] = useState(false)

    //filter pins by query
    useEffect(() => {
        const filterLocations = filterLocationsByQuery(data, query)

        setLocations(filterLocations)
    }, [data, query])

    //mouse events
    const mouseDown = (e) => {
        e.preventDefault()
        setDown(true)
    }

    const mouseMove = (e) => {
        e.preventDefault()
        if(down) {
            setTranslate([translate[0] + e.movementX, translate[1] + e.movementY])
        }
    }

    const mouseUp = (e) => {
        e.preventDefault()
        setDown(false)
    }

    //touch events
    const touchStart = (e) => {
        if(touch.id == -1) {
            const newTouch = e.changedTouches.item(0)
            setTouch({id: newTouch.identifier, pos: [newTouch.clientX, newTouch.clientY]})
        }
    }

    const touchMove = (e) => {
        if(touch.id != -1) {
            let curTouch = null
            for(let i = 0; i < e.changedTouches.length; i++) {
                if (e.changedTouches.item(i).identifier == touch.id) curTouch = e.changedTouches.item(i)
            }
            if (!curTouch) return

            const newPos = [curTouch.clientX - touch.pos[0], curTouch.clientY - touch.pos[1]]

            setTouch({id: touch.id, pos: [curTouch.clientX, curTouch.clientY]})
            setTranslate([translate[0] + newPos[0], translate[1] + newPos[1]])
        }
    }

    const touchEnd = (e) => {
        if(e.changedTouches.item(0).identifier == touch.id) setTouch({id: -1, pos: [0,0]})
    }


    //zoom event
    const zoom = (e) => {
        let newScale = scale + e.deltaY * -0.005
        if(newScale < 1) newScale = 1

        setScale(newScale)
    }

    //image
    const mapImage = (<img className="pos-relative w-fill h-auto user-select-none" src="/img/UMDCampusMap.png"/>)

    //pins
    const pins = locations.map((location) => {
        return (<img className="pin" key={location.id} onClick={() => setActive({location: active.location == location.id ? null : location.id, machine: active.machine})} style={{left: `calc(${location.position[0]} * 100%)`, top: `calc(${location.position[1]} * 100%)`, scale: active.location == location.id ? "1.5" : "1"}} src="/img/MapPin.svg"/>)
    })   

    return (
        <MapDiv>
            <div 
                className="pos-relative flex w-fill h-fill overflow-clip align-items-center"
                onMouseDown={mouseDown}
                onMouseMove={mouseMove}
                onMouseUp={mouseUp}
                onMouseLeave={mouseUp} 

                onTouchStart={touchStart}
                onTouchMove={touchMove}
                onTouchEnd={touchEnd}
                onTouchCancel={touchEnd}
                
                onWheel={zoom}>
                <div 
                    className="pos-relative w-fill h-auto" 
                    style={{"transformOrigin": `calc(50% - ${translate[0]}px) calc(50% - ${translate[1]}px)`, scale: `${scale}`, translate: `${translate[0]}px ${translate[1]}px`}} >
                    {mapImage}
                    {pins}
                </div>
            </div>      
        </MapDiv>
    )
}