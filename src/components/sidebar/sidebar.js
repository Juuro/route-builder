import React, { useState, useEffect } from 'react'

import './sidebar.css'

const Sidebar = () => {
  const [array, setArray] = useState([])

  useEffect(() => {
    console.log('hi')
  }, [])

  const onButtonClick = () => {
    setArray((array) => [...array, ['lalala', 'loo']])
    console.log(array)
  }

  const onButtonDelete = () => {
    setArray([])
    console.log(array)
  }

  return (
    <aside className="sidebar">
      <h1>Route Builder</h1>
      <button onClick={onButtonClick}>bam</button>
      <button onClick={onButtonDelete}>delete</button>
    </aside>
  )
}

export default Sidebar
