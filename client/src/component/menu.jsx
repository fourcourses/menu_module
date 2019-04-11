import React from 'react';
const menu = (props) => {
  return (
    <div className="menus">
      <h1 id="menuBar">Menu</h1>
      <div className="typeBar" id="top">
        <input type="button" className="buttons" id="lunchButtons" onClick={() => props.lunchFunc()} value="lunch Menu"></input><div className="spacer"></div>
        <input type="button" className="buttons" id="dinnerButtons" onClick={() => props.dinnerFunc()} value="Dinner Menu"></input><div className="spacer"></div>
        <input type="button" className="buttons" id="dessertButtons" onClick={() => props.breakFunc()} value="Dessert Menu"></input></div>
      <div >
        <h3 className="headers">Starters</h3>
        <div id="wrapper1">
          {props.menus.dishes.map((dishes, index) => {
            return dishes.subType === 'starters' && <div className="item" key={index.toString()}>
              <div className="dishName"><div className="dname">{dishes.dish}</div><div className='price'>${dishes.price}</div></div>
              <div className="ingredients">{dishes.ingredients}</div>
            </div>
          })}
          <div id="blur"></div>
        </div>
        <div id={"hiddenContainer"}>
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
      </div>
      <div>
        <div id="verticalSpacer"></div>
        <div id="menuBottom"><p id="lastUpdated">Last updated: April 9, 2019</p>
        <div id="poweredByDiv">Powered By <img id="poweredBy" src="/images/poweredby.png"></img>
        </div>
        </div>
      </div>
    </div>
  )
}
export default menu