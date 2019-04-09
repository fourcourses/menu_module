import React from 'react'
import $ from 'jquery'
import Menu from './menu.jsx'
import data from '../mockdata.js'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menus: data,
      type: data
    }
    this.breakFastFunc = this.breakFastFunc.bind(this)
    this.lunchFunc = this.lunchFunc.bind(this)
    this.dinnerFunc = this.dinnerFunc.bind(this)
    this.colFunc = this.colFunc.bind(this)
  }
  componentDidMount() {
    this.renderView()
    this.colFunc()
  }
  renderView() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/menu3',
      success: (reqData) => {
        this.setState({
          menus: reqData,
          type: reqData,
          exp: 'expand'
        })
      }
    })
  }
  breakFastFunc() {
    var data = this.state.menus
    var breakfastDishes = []
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
      this.setState({
        exp: 'col'
      })
    }
    else{
      document.getElementById('hiddenContainer').style.display = "block"
      document.getElementById('stickyButton').value ='Collapse menu'
      this.setState({
        exp : 'expand'
      })
    }
  }
  render() {
    return (
      <div>
        <Menu menus={this.state.type} breakFunc={this.breakFastFunc} lunchFunc={this.lunchFunc} dinnerFunc={this.dinnerFunc} colFunc={this.colFunc} />
      </div>
    )
  }
}
export default App