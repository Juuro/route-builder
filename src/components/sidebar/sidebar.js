import React, {useState} from 'react'

import Waypoint from '../waypoint/waypoint'

import './sidebar.css'

const Sidebar = () => {
  const [waypoints, setWaypoints] = useState([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}])
  const [dragEl, setDragEl] = useState(null)

  const moveWaypoint = el => {
    setWaypoints(prevState => {
      const itemIndex = prevState.findIndex(i => {
        return i.id === dragEl.id
      })
      const hoverIndex = prevState.findIndex(i => {
        return i.id === el
      })
      const newstate = [...prevState]

      newstate.splice(itemIndex, 1)
      newstate.splice(hoverIndex, 0, dragEl)

      return [...newstate]
    })
  }

  const setDragElement = el => {
    setDragEl(el)
  }

  return (
    <aside className="sidebar">
      <h1>Route Builder</h1>
      <hr />
        <div className="waypoints">

          {waypoints.map(waypoint => (
            <Waypoint key={waypoint.id} id={waypoint.id} waypoint={waypoint} moveWaypoint={moveWaypoint} setDragElement={setDragElement} />
          ))}
          
        </div>
      <button>
        <span>Download your Route</span>
      </button>
    </aside>
  )
}

export default Sidebar
