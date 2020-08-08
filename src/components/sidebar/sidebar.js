import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Waypoint from '../waypoint/waypoint'

import './sidebar.scss'

const Sidebar = () => {
    const [waypoints, setWaypoints] = useState([
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
    ])
    const [dragEl, setDragEl] = useState(null)
    const [markers, setMarkers] = useState(useSelector(state => {
        console.log('Sidebar init', state.markers)
        return state.markers
    }))

    const dinger = useSelector(state => state.markers)

    const moveWaypoint = el => {
        setWaypoints(prevState => {
            const itemIndex = prevState.findIndex(waypoint => waypoint.id === dragEl.id)
            const hoverIndex = prevState.findIndex(waypoint => waypoint.id === el)
            const newstate = [...prevState]

            newstate.splice(itemIndex, 1)
            newstate.splice(hoverIndex, 0, dragEl)

            return [...newstate]
        })
    }

    const setDragElement = el => {
        setDragEl(el)
    }

    useEffect(() => {
        console.log('Sidebar', dinger)
    })

    return (
        <aside className="sidebar">
            <h1>Route Builder</h1>
            <hr />
            <div className="waypoints">
                {dinger.map((waypoint, index) => (
                    <Waypoint
                        key={index}
                        id={index}
                        waypoint={waypoint}
                        moveWaypoint={moveWaypoint}
                        setDragElement={setDragElement}
                    />
                ))}
            </div>
            <button>
                <span>Download your Route</span>
            </button>
        </aside>
    )
}

export default Sidebar
