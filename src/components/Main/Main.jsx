import React from 'react'
import { Map, Marker, TileLayer } from "react-leaflet"

const Main = (props) => {
    const params = props.data
    return(
        <Map center={[params[0], params[1]]} zoom={12}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[
                params[0],
                params[1]
            ]}
          />
        </Map>
    )
}

export default Main