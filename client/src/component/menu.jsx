import React from 'react';
import mockData from '../mockdata.js'
const menu = () => {
  var id = 0
  return (
    <div className='wrapper'>
      {mockData.map(x => <div className="item">
        <div>{x.name}</div>
        <div>${x.price}</div>
        <div>{x.ingredients}</div>
      </div>)}
    </div>
  )
}
export default menu