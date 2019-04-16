import React from 'react'
//import { observeStickyEvents, StickyEvent } from "sticky-events";
import $ from 'jquery'
import Menu from './menu.jsx'
//import data from '../mockdata.js'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menus: '',
      type: ''
    }
    this.breakFastFunc = this.breakFastFunc.bind(this)
    this.lunchFunc = this.lunchFunc.bind(this)
    this.dinnerFunc = this.dinnerFunc.bind(this)
    this.colFunc = this.colFunc.bind(this)
    this.scrollFunc = this.scrollFunc.bind(this)
  }
  componentDidMount() {
   // this.stickyEvent()
    this.renderView()
  }
  // stickyEvent(){
  //   observeStickyEvents()
  //   const stickies = document.getElementById('colButton');
  //   stickies.addEventListener(StickyEvent.CHANGE,()=>console.log('HELLO'))
  // }
  renderView() {
    const id = window.location.pathname.split('/')[2];
    $.ajax({
      method: 'GET',
      url: `/menu/${id}`,
      success: (reqData) => {
        this.setState({
          menus: reqData,
          type: reqData,
          exp: 'expand'
        })
        this.colFunc()
        this.lunchFunc()
      }
    })
  }
  
  scrollFunc(a) {
    if (this.state.exp === 'expand') {
      document.getElementById('top').scrollIntoView()
      document.get
    } a()
  }
  breakFastFunc() {
    var data = this.state.menus
    var breakfastDishes = []
    document.getElementById("dessertButtons").style.border ="2px solid red"
    document.getElementById("lunchButtons").style.border ="0px"
    document.getElementById("dinnerButtons").style.border ="0px"
    for (var x = 0; x < data.dishes.length; x++) {
      if (data.dishes[x].dishType === 'Breakfast') {
        breakfastDishes.push(data.dishes[x])
      }
    }
    this.setState({
      type: { dishes: breakfastDishes }
    })
  }
  lunchFunc() {
    var data = this.state.menus
    var breakfastDishes = []
    document.getElementById("lunchButtons").style.border ="2px solid red"
    document.getElementById("dessertButtons").style.border ="0px"
    document.getElementById("dinnerButtons").style.border ="0px"
    for (var x = 0; x < data.dishes.length; x++) {
      if (data.dishes[x].dishType === 'Lunch') {
        breakfastDishes.push(data.dishes[x])
      }
    }
    this.setState({
      type: { dishes: breakfastDishes }
    })
  }
  dinnerFunc() {
    var data = this.state.menus
    var breakfastDishes = []
    document.getElementById("dinnerButtons").style.border ="2px solid red"
    document.getElementById("dessertButtons").style.border ="0px"
    document.getElementById("lunchButtons").style.border ="0px"
    for (var x = 0; x < data.dishes.length; x++) {
      if (data.dishes[x].dishType === 'Dinner') {
        breakfastDishes.push(data.dishes[x])
      }
    }
    this.setState({
      type: { dishes: breakfastDishes }
    })
  }
  colFunc() {
    if (this.state.exp === 'expand') {
      document.getElementById('hiddenContainer').style.display = "none"
      document.getElementById('stickyButton').value = "View full Menu"
      document.getElementById('blur').style.display = "block"
      document.getElementById('wrapper1').style.borderBottomWidth = "0px"

      this.setState({
        exp: 'col'
      })
    }
    else {
      document.getElementById('hiddenContainer').style.display = "block"
      document.getElementById('stickyButton').value = 'Collapse menu'
      document.getElementById('blur').style.display = "none"
      document.getElementById('wrapper1').style.borderBottomWidth = "1px"
      this.setState({
        exp: 'expand'
      })
    }
  }
  render() {
    return (
      <div>
        {this.state.type !== '' &&<Menu menus={this.state.type} breakFunc={this.breakFastFunc} lunchFunc={this.lunchFunc} dinnerFunc={this.dinnerFunc} scrollFunc={this.scrollFunc} colFunc={this.colFunc} />}
      </div>
    )
  }
}
export default App