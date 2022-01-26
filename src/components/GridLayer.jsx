import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet'
import * as L from "leaflet";
import * as turf from '@turf/turf'

const GridLayer = (props) => {

    let map = useMap();

    useEffect(() => {

        L.GridLayer.DebugCoords = L.GridLayer.extend({
            // {x, y, z}
            createTile: function (coords) {
                if (coords.z < 12) {
                    const emptyDiv = document.createElement('div')
                    emptyDiv.style.outline = '1px solid blue';
                    emptyDiv.innerHTML = 'z:' + [coords.z, coords.x, coords.y].join(', ');
                    return emptyDiv;
                }

                let latDegreeSum = tile2lat(coords.y, coords.z - 2);
                let lonStartDegree = tile2long(coords.x, coords.z - 2);
                let latDegreeSumNext = tile2lat(coords.y + 1, coords.z - 2);
                let lonStartDegreeNext = tile2long(coords.x + 1, coords.z - 2);

                const minXY = convertToMercatorTurf([lonStartDegree, latDegreeSum]).geometry.coordinates;
                const maxXY = convertToMercatorTurf([lonStartDegreeNext, latDegreeSumNext]).geometry.coordinates;

                let tile = document.createElement('img');
                tile.src = `https://pkk.rosreestr.ru/arcgis/rest/services/PKK6/CadastreObjects/MapServer/export?layers=show%3A30%2C27%2C24%2C23%2C22&dpi=96&format=PNG32&bbox=${minXY[0]}%2C${minXY[1]}%2C${maxXY[0]}%2C${maxXY[1]}&bboxSR=102100&imageSR=102100&size=1024%2C1024&transparent=true&f=image`;
                return tile;
            }
        });


        L.gridLayer.debugCoords = function (opts) {
            return new L.GridLayer.DebugCoords(opts);
        };


        map.addLayer(L.gridLayer.debugCoords({
            tileSize: 1024,
            noWrap: true
        }));

    }, [])

    function convertToMercatorTurf(lonLat) {
        let pt = turf.point(lonLat);
        return turf.toMercator(pt);
    }

    function tile2long(x, z) {
        return (x / Math.pow(2, z) * 360 - 180);
    }

    function tile2lat(y, z) {
        var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
        return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
    }

    return (
        <div></div>
    )
}

export default GridLayer;