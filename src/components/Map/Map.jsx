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
    return (
        <MapDiv isDesktop={isDesktop}>
            <h3>Map Section</h3>
        </MapDiv>
    )
}