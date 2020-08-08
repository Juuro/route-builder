import React from 'react'
import PropTypes from 'prop-types'

import {ReactComponent as DeleteIcon} from './delete.svg'

import './waypoint.scss'

const Waypoint = ({waypoint, moveWaypoint, setDragElement, id}) => {
    const removeWaypoint = () => {
        // console.log('removeWaypoint')
    }

    const onDragStart = ({target}) => {
        setDragElement(waypoint)
        setTimeout(() => {
            target.style.opacity = 0.5
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
            onDragOver={onDragOver(id)}
            onDragEnd={onDragEnd}
        >
            <div className="waypoint-drag-handle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="waypoint-title">Waypoint {waypoint.id}</div>
            <div className="waypoint-delete">
                <DeleteIcon className="delete-icon" onClick={removeWaypoint} />
            </div>
        </div>
    )
}

Waypoint.propTypes = {
    waypoint: PropTypes.object.isRequired,
    moveWaypoint: PropTypes.func.isRequired,
    setDragElement: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
}

export default Waypoint
