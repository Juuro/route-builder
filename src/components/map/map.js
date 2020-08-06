import React, { useState, useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import Leaflet from 'leaflet'

import './map.css'

const Map = () => {
  let map = useRef(null)
  let markers = []
  let path = useRef({})

  const [coordinates, setCoordinates] = useState([])

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
  }, [])

  useEffect(() => {
    console.log('useEffect', coordinates)
    map.current.removeLayer(path.current)
    
    path.current = Leaflet.polyline(coordinates, { color: '#4085E1', weight: 8 }).addTo(map.current)
  }, [coordinates])

  const onMapClick = (event) => {

    const marker = Leaflet.marker(event.latlng, {
      draggable: true,
      icon: Leaflet.divIcon({
        html: markers.length + 1,
        className: 'marker-text',
      }),
    }).addTo(map.current)
    marker.on('move', onMarkerMove)

    markers.push(marker)
    setCoordinates(coordinates => [...coordinates, [event.latlng.lat, event.latlng.lng]])
  }

  const onMarkerMove = () => {
    map.current.removeLayer(path.current)

    let newCoordinates = []
    markers.forEach(marker => {
      const latlng = marker.getLatLng()
      newCoordinates.push([latlng.lat, latlng.lng])
    })
    setCoordinates(newCoordinates)
  }

  return (
    <>
      <div id="mapid"></div>
    </>
  )
}

export default Map
