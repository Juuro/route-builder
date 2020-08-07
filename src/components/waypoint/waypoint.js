import React from 'react'

import {ReactComponent as DeleteIcon} from './delete.svg'

import './waypoint.css'

const Waypoint = ({waypoint, moveWaypoint, setDragElement, id}) => {
  const removeWaypoint = event => {
    console.log('removeWaypoint')
  }

  const onDragStart = ({target}) => {
    setDragElement(waypoint)
    setTimeout(() => {
      target.style.opacity = .5
      target.classList.add('dragging')
    }, 1)
  }

  const onDragOver = id => event=> {
    moveWaypoint(id)
    event.preventDefault()
  }

  const onDragEnd = ({target}) => {
    target.style.opacity = 1
    target.classList.remove('dragging')
  }

  return (
    <div className="waypoint" draggable="true" onDragStart={onDragStart} onDragOver={onDragOver(id)} onDragEnd={onDragEnd}>
      <div className="waypoint-drag-handle">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="waypoint-title">Waypoint {id}</div>
      <div className="waypoint-delete">
        <DeleteIcon className="delete-icon" onClick={removeWaypoint} />
      </div>
    </div>
  )
}

export default Waypoint