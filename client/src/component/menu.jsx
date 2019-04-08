import React from 'react';
const menu = (props) => {
  console.log(props.menus)
  return (
    <div>
    <div className="typeBar"><button onClick={()=>props.breakFunc()}>Breakfast</button><button onClick={()=>props.lunchFunc()} >Lunch</button><button onClick={()=>props.dinnerFunc()}>Dinner</button></div>
    <div >
    <div className="wrapper">Main course
      {props.menus.dishes.map((dishes, index) => {return dishes.subType === 'Main course' && <div className="item" key={index.toString()}>
        <div className="dish_name"><div className="dname">{dishes.dish}</div><div className='price'>${dishes.price}</div></div>
        <div className="ingredients">{dishes.ingredients}</div>
  </div>})}
    </div>
    <div className="wrapper">Starters
      {props.menus.dishes.map((dishes, index) => {return dishes.subType === 'starters' && <div className="item" key={index.toString()}>
        <div className="dish_name"><div className="dname">{dishes.dish}</div><div className='price'>${dishes.price}</div></div>
        <div className="ingredients">{dishes.ingredients}</div>
  </div>})}
    </div>
    </div>
    </div>
  )
}
export default menu
