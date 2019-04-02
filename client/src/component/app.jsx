import React from 'react'
import $ from 'jquery'
import Menu from './menu.jsx'
import data from '../mockdata.js'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menus: data
    }
  }
  componentDidMount(){
    this.renderView()
  }
  renderView() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/menu3',
      success: (reqData) => {
        this.setState({
          menus: reqData
        })
      }
    })
  }
  render() {
    return (
      <div>
        <Menu menus={this.state.menus} />
      </div>
    )
  }
}
export default App