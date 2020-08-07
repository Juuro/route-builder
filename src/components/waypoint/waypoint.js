import React from 'react'

import {ReactComponent as DeleteIcon} from './delete.svg'

import './waypoint.css'

const Waypoint = props => {
  return (
    <div className="waypoint">
      <div className="waypoint-drag-handle">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="waypoint-title">Waypoint {props.id}</div>
      <div className="waypoint-delete">
        <DeleteIcon className="delete-icon" />
      </div>
    </div>
  )
}

export default Waypoint