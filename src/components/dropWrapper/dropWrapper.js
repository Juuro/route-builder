import React from 'react'

const DropWrapper = ({onDrop, children, status}) => {
  const allowDrop = event => {
    event.preventDefault()
  }

  // const handleDrop = event => {
  //   const data = JSON.parse(event.dataTransfer.getData('waypoint'))
  //   onDrop(data, status)
  // }

  return (
    <div onDragOver={allowDrop} onDrop={handleDrop} className='drop-wrapper'>
     {children}
     </div>
  )
}

export default DropWrapper