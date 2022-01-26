import React, { useEffect } from "react";
import { useMap } from 'react-leaflet'

const Bound = (props) => {

    let map = useMap();
    let boundingBox;

    useEffect(() => {
        let bounds = map.getBounds();
        boundingBox = `Север: ${bounds.getNorth()}, Юг: ${bounds.getSouth()}, Запад: ${bounds.getWest()}, Восток: ${bounds.getEast()}`;
        console.log(boundingBox)
        map.createPane('labels');
    }, [])

    map.on('zoomend', () => {
        let bounds = map.getBounds();
        boundingBox = `Север: ${bounds.getNorth()}, Юг: ${bounds.getSouth()}, Запад: ${bounds.getWest()}, Восток: ${bounds.getEast()}`;
        console.log(boundingBox)
    })

    map.on('click', (e) => {
        console.log(`Широта: ${e.latlng.lat} `);
        console.log(`Долгота: ${e.latlng.lng} `);
    })

    return (
        <div>
            
        </div>
    )
}

export default Bound;