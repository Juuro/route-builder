import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import './sidebar.scss'
import DownloadGPXButton from '../downloadGPXButton/DownloadGPXButton'

import Waypoint from '../waypoint/waypoint'

const Sidebar = () => {
    const dispatch = useDispatch()
    const [dragEl, setDragEl] = useState(null)

    const markers = useSelector(state => state.markers)

    const hasMarkerOrderChanged = newMarkers => {
        const markerIds = markersArray => markersArray.map(marker => marker[Object.keys(marker)[0]])

        return markerIds(newMarkers).toString() !== markerIds(markers).toString()
    }

    const moveWaypoint = el => {
        const itemIndex = markers.findIndex(marker => marker.id === dragEl.id)
        const hoverIndex = markers.findIndex(marker => marker.id === el)
        const newMarkers = [...markers]

        newMarkers.splice(itemIndex, 1)
        newMarkers.splice(hoverIndex, 0, dragEl)

        if (hasMarkerOrderChanged(newMarkers)) {
            dispatch({type: 'REPLACE_MARKERS', payload: newMarkers})
        }
    }

    const setDragElement = el => {
        setDragEl(el)
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
