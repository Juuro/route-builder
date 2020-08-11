import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import 'leaflet/dist/leaflet.css'
import Leaflet from 'leaflet'

import './Map.scss'

const Map = () => {
    const dispatch = useDispatch()

    const map = useRef(null)
    const path = useRef({})
    const mapElement = useRef(null)

    const markers = useSelector(state => state.markers)
    const [newMarker, setNewMarker] = useState(null)
    const [newMarkerPosition, setNewMarkerPosition] = useState(null)

    const geoFindMe =() => {
        const success = position => {
            const {latitude} = position.coords
            const {longitude} = position.coords

            // eslint-disable-next-line no-magic-numbers
            map.current.setView([latitude, longitude], 12)
        }

        const error = () => {
            // eslint-disable-next-line no-magic-numbers
            map.current.setView([46.378333, 13.836667], 12)
        }

        if (!navigator.geolocation) {
            // eslint-disable-next-line no-magic-numbers
            map.current.setView([46.378333, 13.836667], 12)
        } else {
            navigator.geolocation.getCurrentPosition(success, error)
        }
    }

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

        map.current = Leaflet.map(mapElement.current)
        geoFindMe()
        dispatch({type: 'ADD_MAP', payload: map.current})

        Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/outdoors-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoianV1cm8iLCJhIjoiY2tkaGdoNzk0MDJ1YTJzb2V4anZ3NXk4bSJ9.1m7LQQaTf2W4R-IgKKGZCQ',
        }).addTo(map.current)

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

        path.current = Leaflet.polyline(newCoordinates, {color: '#4085E1', weight: 8})

        path.current.addTo(map.current)

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
