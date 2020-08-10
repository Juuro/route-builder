import React from 'react'
import {useSelector} from 'react-redux'

import generateGPX from './gpxTemplate'

import './DownloadGPXButton.scss'

const DownloadGPXButton = () => {
    const markers = useSelector(state => state.markers)

    const generateTrkpt = () => {
        const trkptArray = markers.map(marker => {
            const {lat} = marker.marker.getLatLng()
            const {lng} = marker.marker.getLatLng()

            return `    <trkpt lat="${lat}" lon="${lng}"></trkpt>`
        })

        return trkptArray.join('\n')
    }

    const downloadGPX = event => {
        if (markers.length) {
            const element = document.createElement('a')
            const file = new Blob([generateGPX(generateTrkpt())], {type: 'application/gpx'})
            element.href = URL.createObjectURL(file)
            element.download = 'route.gpx'
            document.body.appendChild(element)
            element.click()
        }
        event.currentTarget.blur()
    }

    return (
        <button className="button-download-gpx" onClick={downloadGPX} title="Download GPX file">
            <span>Download your Route</span>
        </button>
    )
}

export default DownloadGPXButton
