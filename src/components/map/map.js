import React, {useState, useEffect, useRef} from 'react'
import 'leaflet/dist/leaflet.css'
import Leaflet from 'leaflet'

import './map.css'

const Map = () => {
    const map = useRef(null)
    const path = useRef({})

    const [markers, setMarkers] = useState([])
    const [newMarker, setNewMarker] = useState(null)
    const [newMarkerPosition, setNewMarkerPosition] = useState(null)

    useEffect(() => {
        const onMarkerMove = event => {
            setNewMarkerPosition(event.latlng)
        }

        const onMapClick = event => {
            const marker = Leaflet.marker(event.latlng, {
                draggable: true,
            }).addTo(map.current).on('move', onMarkerMove)

            setNewMarker(marker)
        }

        // eslint-disable-next-line no-magic-numbers
        map.current = Leaflet.map('mapid').setView([46.378333, 13.836667], 12)

        Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/outdoors-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
          'pk.eyJ1IjoianV1cm8iLCJhIjoiY2tkaGdoNzk0MDJ1YTJzb2V4anZ3NXk4bSJ9.1m7LQQaTf2W4R-IgKKGZCQ',
        }).addTo(map.current)

        map.current.on('click', onMapClick)

    }, [])

    useEffect(() => {
        if (newMarker) {
            newMarker.setIcon(Leaflet.divIcon({
                html: markers.length + 1,
                className: 'marker-text',
            }))
            setMarkers(existingMarkers => [...existingMarkers, newMarker])
        }

        return () => {
            setNewMarker(null)
        }
    }, [newMarker, markers])

    useEffect(() => {
        map.current.removeLayer(path.current)

        const newCoordinates = []
        markers.forEach(marker => {
            const latlng = marker.getLatLng()
            newCoordinates.push([latlng.lat, latlng.lng])
        })

        path.current = Leaflet.polyline(newCoordinates, {
            color: '#4085E1',
            weight: 8,
        }).addTo(map.current)

        return () => {
            setNewMarkerPosition(null)
        }
    }, [markers, newMarkerPosition])

    return (
        <>
            <div id="mapid"></div>
        </>
    )
}

export default Map
