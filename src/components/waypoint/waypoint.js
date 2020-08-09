import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'

import {ReactComponent as DeleteIcon} from './delete.svg'

import './waypoint.scss'

const Waypoint = ({waypoint, moveWaypoint, setDragElement}) => {
    const dispatch = useDispatch()
    const map = useSelector(state => state.map)

    const removeWaypoint = () => {
        waypoint.marker.removeFrom(map)
        dispatch({type: 'REMOVE_MARKER', payload: waypoint.id})
    }

    const onDragStart = ({target}) => {
        setDragElement(waypoint)
        setTimeout(() => {
            target.style.opacity = 0.2
            target.classList.add('dragging')
        }, 1)
    }

    const onDragOver = waypointId => event => {
        moveWaypoint(waypointId)
        event.preventDefault()
    }

    const onDragEnd = ({target}) => {
        target.style.opacity = 1
        target.classList.remove('dragging')
    }

    return (
        <div
            className="waypoint"
            draggable="true"
            onDragStart={onDragStart}
            onDragOver={onDragOver(waypoint.id)}
            onDragEnd={onDragEnd}
        >
            <div className="waypoint-drag-handle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="waypoint-title">Waypoint {waypoint.id}</div>
            <div className="waypoint-delete" onClick={removeWaypoint}>
                <DeleteIcon className="delete-icon" />
            </div>
        </div>
    )
}

Waypoint.propTypes = {
    waypoint: PropTypes.object.isRequired,
    moveWaypoint: PropTypes.func.isRequired,
    setDragElement: PropTypes.func.isRequired,
}

export default Waypoint
