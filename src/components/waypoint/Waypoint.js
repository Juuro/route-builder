import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {polyfill} from 'mobile-drag-drop'
import {scrollBehaviourDragImageTranslateOverride} from 'mobile-drag-drop/scroll-behaviour'

import {ReactComponent as DeleteIcon} from './delete.svg'

import './Waypoint.scss'

const Waypoint = ({waypoint, moveWaypoint, setDragElement}) => {
    polyfill({dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride})

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

    const onDragEnter = event => {
        event.preventDefault()
    }

    return (
        <div
            className="waypoint"
            draggable="true"
            onDragStart={onDragStart}
            onDragOver={onDragOver(waypoint.id)}
            onDragEnd={onDragEnd}
            onDragEnter={onDragEnter}
        >
            <div className="waypoint-drag-handle" title="Drag this waypoint to reorder route">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="waypoint-title">Waypoint {waypoint.id}</div>
            <button className="waypoint-delete button-no-button" onClick={removeWaypoint} title="Delete this waypoint">
                <DeleteIcon className="delete-icon" />
            </button>
        </div>
    )
}

Waypoint.propTypes = {
    waypoint: PropTypes.object.isRequired,
    moveWaypoint: PropTypes.func.isRequired,
    setDragElement: PropTypes.func.isRequired,
}

export default Waypoint
