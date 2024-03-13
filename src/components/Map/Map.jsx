import { useContext,useState } from "react"
import DesktopContext from "../context/DesktopContext.jsx"
import "./Map.css"

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

export default function Map({pinObjects, setActive}) {
    const [scale, setScale] = useState(1)
    const [translate, setTranslate] = useState([0,0])
    const [touch, setTouch] = useState({id: -1, pos: [0,0]})
    const [down, setDown] = useState(false)

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
    const mapImage = (<img id="mapImage" src="/src/assets/UMDCampusMap.png"/>)

    //pins
    const pinClick = (name) => {
        setActive(name)
    }

    const pins = pinObjects?.map((pin) => {
        return (<img className="pin" key={pin.name} onClick={() => pinClick(pin.name)} style={{left: `calc(${pin.pos[0]} * 100%)`, top: `calc(${pin.pos[1]} * 100%)`}} src="/src/assets/MapPin.svg"/>)
    })

    return (
        <MapDiv>
            <div 
                id="mapContainer" 
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
                    id="map" 
                    style={{"transformOrigin": `calc(50% - ${translate[0]}px) calc(50% - ${translate[1]}px)`, scale: `${scale}`, translate: `${translate[0]}px ${translate[1]}px`}} >
                    {mapImage}
                    {pins}
                </div>
            </div>      
        </MapDiv>
    )
}