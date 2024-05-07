import { useContext,useState, useMemo, PropsWithChildren, MouseEventHandler, TouchEventHandler, WheelEventHandler } from "react"
import DesktopContext from "../context/DesktopContext.tsx"
import "./Map.css"
import DataContext from "../context/DataContext.tsx"
import {ActiveContext} from "../context/ActiveContext.tsx"
import {QueryContext} from "../context/QueryContext.tsx"
import { filterLocationsByQuery } from "../../supabase.tsx"

function MapDiv({children}: PropsWithChildren) {
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
    const [active, setActive]= useContext(ActiveContext)
    const [query] = useContext(QueryContext)
    const visibleLocations = useMemo(() => filterLocationsByQuery(data, query), [data, query])

    const [scale, setScale] = useState(1)
    const [translate, setTranslate] = useState([0,0])
    const [touch, setTouch] = useState({id: -1, pos: [0,0]})
    const [down, setDown] = useState(false)

    //mouse events
    const mouseDown: MouseEventHandler = (e) => {
        e.preventDefault()
        setDown(true)
    }

    const mouseMove: MouseEventHandler = (e) => {
        e.preventDefault()
        if(down) {
            setTranslate([translate[0] + e.movementX, translate[1] + e.movementY])
        }
    }

    const mouseUp: MouseEventHandler = (e) => {
        e.preventDefault()
        setDown(false)
    }

    //touch events
    const touchStart: TouchEventHandler = (e) => {
        if(touch.id == -1) {
            const newTouch = e.changedTouches.item(0)
            if(newTouch) setTouch({id: newTouch.identifier, pos: [newTouch.clientX, newTouch.clientY]})
        }
    }

    const touchMove: TouchEventHandler = (e) => {
        if(touch.id != -1) {
            let curTouch = null
            for(let i = 0; i < e.changedTouches.length; i++) {
                if (e.changedTouches.item(i)?.identifier == touch.id) curTouch = e.changedTouches.item(i)
            }
            if (!curTouch) return

            const newPos = [curTouch.clientX - touch.pos[0], curTouch.clientY - touch.pos[1]]

            setTouch({id: touch.id, pos: [curTouch.clientX, curTouch.clientY]})
            setTranslate([translate[0] + newPos[0], translate[1] + newPos[1]])
        }
    }

    const touchEnd: TouchEventHandler = (e) => {
        if(e.changedTouches.item(0)?.identifier == touch.id) setTouch({id: -1, pos: [0,0]})
    }


    //zoom event
    const zoom: WheelEventHandler = (e) => {
        let newScale = scale + e.deltaY * -0.005
        if(newScale < 1) newScale = 1

        setScale(newScale)
    }

    //image
    const mapImage = (<img className="pos-relative w-fill h-auto user-select-none" src="/img/UMDCampusMap.png"/>)

    //pins
    const pins = visibleLocations.map((location) => {
        return (<img className="pin" key={location.id} onClick={() => setActive({location: active.location == location.id ? null : location.id, machine: null})} style={{left: `calc(${location.position[0]} * 100%)`, top: `calc(${location.position[1]} * 100%)`, scale: active.location == location.id ? "1.5" : "1"}} src="/img/MapPin.svg"/>)
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