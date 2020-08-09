import React, {lazy, Suspense, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import './sidebar.scss'

const Waypoint = lazy(() => import('../waypoint/waypoint'))
const renderLoader = () => <p>Loading</p>

const Sidebar = () => {
    const dispatch = useDispatch()
    const [dragEl, setDragEl] = useState(null)

    const markers = useSelector(state => state.markers)

    const moveWaypoint = el => {
        const itemIndex = markers.findIndex(marker => marker.id === dragEl.id)
        const hoverIndex = markers.findIndex(marker => marker.id === el)
        const newMarkers = [...markers]

        newMarkers.splice(itemIndex, 1)
        newMarkers.splice(hoverIndex, 0, dragEl)

        dispatch({type: 'REPLACE_MARKERS', payload: newMarkers})
    }

    const setDragElement = el => {
        setDragEl(el)
    }

    const generateTrkpt = () => {
        const trkptArray = markers.map(marker => {
            const {lat} = marker.marker.getLatLng()
            const {lng} = marker.marker.getLatLng()

            return `        <trkpt lat="${lat}" lon="${lng}"></trkpt>`
        })

        return trkptArray.join('\n')
    }

    const generateGPX = () => {
        const gpx = `<?xml version='1.0' encoding='UTF-8'?>
<gpx version="1.1" creator="https://blissful-feynman-b21b41.netlify.app/" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
    <metadata>
        <name>Cross Country Running Route</name>
        <author>
        <link href="https://blissful-feynman-b21b41.netlify.app/">
            <text>Route Builder</text>
            <type>text/html</type>
        </link>
        </author>
    </metadata>
    <trk>
        <name>Cross Country Running Route</name>
        <trkseg>
    ${generateTrkpt()}
        </trkseg>
    </trk>
</gpx>`

        return gpx
    }

    const downloadGPX = event => {
        if (markers.length) {
            const element = document.createElement('a')
            const file = new Blob([generateGPX()], {type: 'application/gpx'})
            element.href = URL.createObjectURL(file)
            element.download = 'route.gpx'
            document.body.appendChild(element)
            element.click()
        } else {
            event.preventDefault()
        }
    }

    return (
        <aside className="sidebar">
            <h1>Route Builder</h1>
            <hr />
            <div className="waypoints">
                {markers.map((waypoint, index) => (
                    <Suspense key={index} fallback={renderLoader()}>
                        <Waypoint
                            key={waypoint.id}
                            waypoint={waypoint}
                            moveWaypoint={moveWaypoint}
                            setDragElement={setDragElement}
                        />
                    </Suspense>
                ))}
            </div>
            <button onClick={downloadGPX}>
                <span>Download your Route</span>
            </button>
        </aside>
    )
}

export default Sidebar
