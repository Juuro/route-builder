import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Waypoint from '../waypoint/waypoint'
import DownloadGPXButton from '../downloadGPXButton/DownloadGPXButton'
import {ReactComponent as ArrowIcon} from './arrow.svg'

import './sidebar.scss'

const Sidebar = () => {
    const dispatch = useDispatch()

    const [sidebarPosition, setSidebarPosition] = useState('down')

    const markers = useSelector(state => state.markers)
    const dragWaypoint = useSelector(state => state.dragWaypoint)

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
        dispatch({type: 'ADD_DRAG_WAYPOINT', payload: el})
    }

    const toggleUpDown = () => {
        setSidebarPosition(position => {
            if (position === 'down') {
                return 'up'
            }
            return 'down'
        })
    }

    return (
        <aside className={`sidebar ${sidebarPosition}`}>
            <a className="sidebar-position-toggle" onClick={toggleUpDown}>
                <ArrowIcon className="sidebar-position-toggle-icon" />
            </a>
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
