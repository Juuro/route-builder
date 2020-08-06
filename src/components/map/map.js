import React, { useState, useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import Leaflet from 'leaflet'

import './map.css'

const Map = (props) => {
  let map = useRef(null)
  let pLineGroup = useRef(Leaflet.layerGroup())
  let markers = []
  let coordinates = useRef([])

  //const [coordinates, setCoordinates] = useState([])
  //const [markers, setMarkers] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    map.current = Leaflet.map('mapid').setView([51.505, -0.09], 13)

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
    console.log('useEffect', coordinates.current)
    pLineGroup.current.addLayer(
      Leaflet.polyline(coordinates.current, { color: '#4085E1', weight: 8 })
    )
    pLineGroup.current.addTo(map.current)
  })

  const onMapClick = (event) => {
    console.log('coordinates', coordinates.current)
    console.log('markers', markers)
    console.log('text', text)

    const marker = Leaflet.marker(event.latlng, {
      draggable: true,
      icon: Leaflet.divIcon({
        html: markers.length + 1,
        className: 'marker-text',
      }),
    }).addTo(map.current)
    marker.on('move', onMarkerMove)

    // setCoordinates((coordinates) => [
    //   ...coordinates,
    //   [event.latlng.lat, event.latlng.lng],
    // ])
    //setMarkers([...markers, marker])
    coordinates.current.push([event.latlng.lat, event.latlng.lng])
    markers.push(marker)
    setText(coordinates.current.length)
  }

  const onMarkerMove = (event) => {
    setText([])
    // setCoordinates([])
    //setMarkers([])
    markers = []
    coordinates.current = []
    console.log('onMarkerMove – coordinates', coordinates.current)
    console.log('onMarkerMove – text', text)
    pLineGroup.current.removeFrom(map.current)
  }

  return (
    <>
      <div id="mapid"></div>
    </>
  )
}

export default Map
