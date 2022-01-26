import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import Bound from './Bound';
import GridLayer from './GridLayer';

const Map = (props) => {

    let options = {
        scrollWheelZoom: true,
        center: [54.1793, 37.5888],
        zoomControl: true,
        zoom: 15,
        buffer: 16
    };

    return (
        <div>
            <MapContainer
                center={options.center}
                zoom={options.zoom}
                zoomControl={options.zoomControl}
                buffer={options.buffer}
                scrollWheelZoom={options.scrollWheelZoom}
                style={{ height: '100vh', width: '100%' }}
            >
                <Marker position={options.center} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={19}
                />
                <Bound />
                <GridLayer />
            </MapContainer>
        </div>
    )
}

export default Map;