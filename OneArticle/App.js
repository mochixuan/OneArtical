import React,{Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from './app/store/configureStore'
import Router from './app/Router'
const store = configureStore()

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router/>
        </Provider>
    );
  }
}


