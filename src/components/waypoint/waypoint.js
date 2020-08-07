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
      target.style.visibility = 'hidden'
    }, 1)
  }

  const onDragOver = event => {
    console.log('event.target: ', event.target.innerText)
    moveWaypoint(event.target.innerText)
    event.preventDefault()
  }

  const onDragEnd = event => {
    event.target.style.visibility = 'visible'
  }

  return (
    <div className="waypoint" draggable="true" onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd} data-lala={id} id={id}>
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