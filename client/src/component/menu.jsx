import React from 'react';
const menu = (props) => {
  console.log(props.menus)
  return (
    <div className='wrapper'>
      {props.menus.dishes.map((dishes, index) => <div className="item" key={index.toString()}>
        <div className="dish_name"><div className="dname">{dishes.dish}</div><div className='price'>${dishes.price}</div></div>
        <div>{dishes.ingredients}</div>
      </div>)}
    </div>
  )
}
export default menu
