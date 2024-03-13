import { useState } from "react"
import "./Map.css"

function MapDiv({isDesktop, children}) {
    return (
        <>
        {isDesktop ? (
            <div id="map-desktop">{children}</div>
        ) : (
            <div id="map-mobile">{children}</div>
        )}
        </>
    )
}

export default function Map({isDesktop}) {
    // eslint-disable-next-line no-unused-vars
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


    //zoom events
    const zoom = (e) => {
        let newScale = scale + e.deltaY * -0.005
        if(newScale < 1) newScale = 1

        setScale(newScale)
    }

    console.log(down, scale, translate)

    return (
        <MapDiv isDesktop={isDesktop}>
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
                <img 
                    id="map" 
                    style={{"transformOrigin": `calc(50% - ${translate[0]}px) calc(50% - ${translate[1]}px)`, scale: `${scale}`, translate: `${translate[0]}px ${translate[1]}px`}} 
                    src="/src/assets/UMDCampusMap.png"/>
            </div>      
        </MapDiv>
    )
}