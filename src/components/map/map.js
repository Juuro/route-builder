import React, { useState, useEffect, useRef, useCallback } from 'react'
import 'leaflet/dist/leaflet.css'
import Leaflet from 'leaflet'

import './map.css'

const Map = () => {
  let map = useRef(null)
  let path = useRef({})

  const [markers, setMarkers] = useState([])
  const [newMarker, setNewMarker] = useState(null)
  const [newMarkerPosition, setNewMarkerPosition] = useState(null)

  const onMarkerMove = useCallback(event => {
    setNewMarkerPosition(event.latlng)
  }, [])

  const onMapClick = useCallback((event) => {
    const marker = Leaflet.marker(event.latlng, {
      draggable: true,
    }).addTo(map.current).on('move', onMarkerMove)

    setNewMarker(marker)
  }, [onMarkerMove])

  useEffect(() => { 
    map.current = Leaflet.map('mapid').setView([46.378333, 13.836667], 12)

    Leaflet.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/outdoors-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1IjoianV1cm8iLCJhIjoiY2tkaGdoNzk0MDJ1YTJzb2V4anZ3NXk4bSJ9.1m7LQQaTf2W4R-IgKKGZCQ',
      }
    ).addTo(map.current)

    map.current.on('click', onMapClick)

  }, [onMapClick])

  useEffect(() => {
    if (newMarker) {
      newMarker.setIcon(Leaflet.divIcon({
        html: markers.length + 1,
        className: 'marker-text',
      }))
      setMarkers((existingMarkers) => [...existingMarkers, newMarker])
      setNewMarker(null)
    }
  }, [newMarker, markers])

  useEffect(() => {
    map.current.removeLayer(path.current)

    let newCoordinates = []
    markers.forEach((marker) => {
      const latlng = marker.getLatLng()
      newCoordinates.push([latlng.lat, latlng.lng])
    })

    path.current = Leaflet.polyline(newCoordinates, {
      color: '#4085E1',
      weight: 8,
    }).addTo(map.current)
  }, [markers, newMarkerPosition])

  return (
    <>
      <div id="mapid"></div>
    </>
  )
}

export default Map
