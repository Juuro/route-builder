import React from 'react'

import Waypoint from '../waypoint/waypoint'

import './sidebar.css'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h1>Route Builder</h1>
      <hr />
      <div className="waypoints">
        <Waypoint id={1} />
        <Waypoint id={2} />
      </div>
      <button>
        <span>Download your Route</span>
      </button>
    </aside>
  )
}

export default Sidebar
