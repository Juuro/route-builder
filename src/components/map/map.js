import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Leaflet from 'leaflet'
import 'mapbox-gl/dist/mapbox-gl.css'
import {} from 'mapbox-gl-leaflet'
import 'leaflet/dist/leaflet.css'

import './map.scss'

const Map = () => {
    const dispatch = useDispatch()

    const map = useRef(null)
    const path = useRef({})
    const mapElement = useRef(null)

    const markers = useSelector(state => state.markers)
    const [newMarker, setNewMarker] = useState(null)
    const [newMarkerPosition, setNewMarkerPosition] = useState(null)

    useEffect(() => {
        const onMarkerMove = event => {
            setNewMarkerPosition(event.latlng)
        }

        const onMapClick = event => {
            const marker = Leaflet.marker(event.latlng, {
                draggable: true,
            }).setIcon(Leaflet.divIcon()).addTo(map.current).on('move', onMarkerMove)

            setNewMarker(marker)
        }

        // eslint-disable-next-line no-magic-numbers
        map.current = Leaflet.map(mapElement.current).setView([46.378333, 13.836667], 12)
        Leaflet.mapboxGL({
            accessToken: 'pk.eyJ1IjoianV1cm8iLCJhIjoiY2tkaGdoNzk0MDJ1YTJzb2V4anZ3NXk4bSJ9.1m7LQQaTf2W4R-IgKKGZCQ',
            style: 'mapbox://styles/mapbox/outdoors-v11',
        }).addTo(map.current)
        dispatch({type: 'ADD_MAP', payload: map.current})

        map.current.on('click', onMapClick)
    }, [dispatch])

    useEffect(() => {
        const calculateMarkerId = () => {
            let maximum = 1
            if (markers.length !== 0) {
                const maximumMarker = markers.reduce((prev, current) => (prev.id > current.id) ? prev : current)
                maximum = maximumMarker.id+1
            }
            return maximum
        }

        if (newMarker) {
            const markerId = calculateMarkerId()
            newMarker.setIcon(Leaflet.divIcon({html: markerId, className: 'marker-text'}))

            const addMarker = {id: markerId, marker: newMarker}

            dispatch({type: 'ADD_MARKERS', payload: addMarker})
        }

        return () => {
            setNewMarker(null)
        }
    }, [newMarker, markers, dispatch])

    useEffect(() => {
        map.current.removeLayer(path.current)

        const newCoordinates = []
        markers.forEach(({marker}) => {
            const latlng = marker.getLatLng()
            newCoordinates.push([latlng.lat, latlng.lng])
        })

        path.current = Leaflet.polyline(newCoordinates, {color: '#4085E1', weight: 8}).addTo(map.current)

        return () => {
            setNewMarkerPosition(null)
        }
    }, [markers, newMarkerPosition])

    return (
        <>
            <div className="mapid" ref={mapElement}></div>
        </>
    )
}

export default Map
