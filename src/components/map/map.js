import React, { useState, useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import Leaflet from 'leaflet'

import './map.css'

const Map = (props) => {
  let map = useRef(null)
  let markers = []
  let coordinates = useRef([])
  let path = useRef({})

  const [coords, setCoords] = useState([])

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
    console.log('useEffect', coords)
    map.current.removeLayer(path.current)
    
    path.current = Leaflet.polyline(coords, { color: '#4085E1', weight: 8 }).addTo(map.current)
  })

  const onMapClick = (event) => {

    const marker = Leaflet.marker(event.latlng, {
      draggable: true,
      icon: Leaflet.divIcon({
        html: markers.length + 1,
        className: 'marker-text',
      }),
    }).addTo(map.current)
    marker.on('move', onMarkerMove)

    coordinates.current.push([event.latlng.lat, event.latlng.lng])
    markers.push(marker)
    setCoords(coords => [...coords, [event.latlng.lat, event.latlng.lng]])
  }

  const onMarkerMove = (event) => {
    setCoords([])
    coordinates.current = []
    map.current.removeLayer(path.current)

    let cordelz = []
    markers.forEach(marker => {
      const latlng = marker.getLatLng()
      cordelz.push([latlng.lat, latlng.lng])
    })
    setCoords(cordelz)
  }

  return (
    <>
      <div id="mapid"></div>
    </>
  )
}

export default Map
