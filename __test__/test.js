import React from 'react'
import Menu from '../client/src/component/menu.jsx'
import App from '../client/src/component/app.jsx'
import {
  shallow,
  mount,
  render
} from 'enzyme'
import menu from '../client/src/component/menu.jsx';
var testData = {
  dishes: [{
    name: 'pizza',
    price: '8',
    ingredients: 'pepporoni'
  }]
}
const menuComp = shallow( < Menu menus = {
      testData
    }
    />);
    const appComp = shallow( < App / > ); describe('App component', () => {
      test('App component Should Render ', () => {
        expect(appComp.exists()).toBe(true);
      });
    }); describe('Menu component', () => {
      test('Menu component should render', () => {
        expect(menuComp.exists()).toBe(true)
      })
      test('Menu component should have a dish name', () => {
        expect(menuComp.find('.dish_name').exists()).toBe(true)
      })
      test('Menu componenet should have a price ', () => {
        expect(menuComp.find('.price').exists()).toBe(true)
      })
      test('Menu component should have ingredients', () => {
        expect(menuComp.find('.ingredients').exists()).toBe(true)
      })
      test('Menu component should make a API call to the server', () => {})
    })