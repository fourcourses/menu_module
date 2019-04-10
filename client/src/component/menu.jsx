import React from 'react';
const menu = (props) => {
  return (
    <div className="menu">
      <h1>Menu</h1>
      <div id="line">____________________________________________________________________</div>
      <div className="typeBar" id="top">
        <input type="button" id="buttons" onClick={() => props.lunchFunc()} value="lunch Menu"></input><div className="spacer"></div>
        <input type="button" id="buttons" onClick={() => props.dinnerFunc()} value="Dinner Menu"></input><div className="spacer"></div>
        <input type="button" id="buttons" onClick={() => props.breakFunc()} value="Dessert Menu"></input></div>
      <div id="line">____________________________________________________________________</div>
      <div >
        <h3 className="headers">Starters</h3>
        <div className="wrapper1">
          {props.menus.dishes.map((dishes, index) => {
            return dishes.subType === 'starters' && <div className="item" key={index.toString()}>
              <div className="dishName"><div className="dname">{dishes.dish}</div><div className='price'>${dishes.price}</div></div>
              <div className="ingredients">{dishes.ingredients}</div>
            </div>
          })}
          <div id="blur"></div>
        </div>
        <div id={"hiddenContainer"}>
          <div id="line">____________________________________________________________________</div>
          <h3 className="headers">Main course</h3>
          <div id="wrapper2">
            {props.menus.dishes.map((dishes, index) => {
              return dishes.subType === 'Main course' && <div className="item" key={index.toString()}>
                <div className="dishName"><div className="dname">{dishes.dish}</div><div className='price'>${dishes.price}</div></div>
                <div className="ingredients">{dishes.ingredients}</div>
              </div>
            })}
          </div>
        </div>
        <div id="colButton">
          <input type="button" id="stickyButton" onClick={() => props.scrollFunc(props.colFunc)} onScroll={(e) => console.log(e.target.position)} ></input>
        </div>
        <div id="line">____________________________________________________________________</div>
      </div>
    </div>
  )
}
export default menu

