import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import './sidebar.scss'
import DownloadGPXButton from '../downloadGPXButton/DownloadGPXButton'

import Waypoint from '../waypoint/waypoint'

const Sidebar = () => {
    const dispatch = useDispatch()
    const [dragWaypoint, setDragWaypoint] = useState(null)

    const markers = useSelector(state => state.markers)

    const hasMarkerOrderChanged = newMarkers => {
        const markerIds = markersArray => markersArray.map(marker => marker[Object.keys(marker)[0]])

        return markerIds(newMarkers).toString() !== markerIds(markers).toString()
    }

    const moveWaypoint = hoverWaypointId => {
        const dragItemIndex = markers.findIndex(marker => marker.id === dragWaypoint.id)
        const hoverItemIndex = markers.findIndex(marker => marker.id === hoverWaypointId)
        const newMarkers = [...markers]

        newMarkers.splice(dragItemIndex, 1)
        newMarkers.splice(hoverItemIndex, 0, dragWaypoint)

        if (hasMarkerOrderChanged(newMarkers)) {
            dispatch({type: 'REPLACE_MARKERS', payload: newMarkers})
        }
    }

    const setDragElement = el => {
        setDragWaypoint(el)
    }

    return (
        <aside className="sidebar">
            <h1>Route Builder</h1>
            <hr />
            <div className="waypoints">
                {markers.map(waypoint => (
                    <Waypoint
                        key={waypoint.id}
                        id={waypoint.id}
                        waypoint={waypoint}
                        moveWaypoint={moveWaypoint}
                        setDragElement={setDragElement}
                    />
                ))}
            </div>
            {markers.length ? <DownloadGPXButton /> : null}
        </aside>
    )
}

export default Sidebar
