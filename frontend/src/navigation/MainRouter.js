import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Router, Link, Route } from './nav-modules';
import Home from '../screens/Home';
import Secret from '../screens/Secret';


export default class MainRouter extends Component {
  render() {
    return (
      <Router>
        <View>
          <View>


          </View>
          <Route exact path="/" component={Home} />
          <Route exact path="/secret" component={Secret} />
        </View>
      </Router>
    )
  }
}
