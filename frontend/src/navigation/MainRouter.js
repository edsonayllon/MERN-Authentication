import React, { Component } from 'react';
import {
  View,
  FlatList
} from 'react-native';
import { Router, Link, Route } from './nav-modules';
import Home from '../screens/Home';
import Secret from '../screens/Secret';
import Login from '../screens/Login';


export default class MainRouter extends Component {
  render() {
    const routesInfo = [
      {
        path: '/',
        component: Home,
        title: 'Home'
      },
      {
        path: '/secret',
        component: Secret,
        title: 'Secret'
      },
      {
        path: '/login',
        component: Login,
        title: 'Login'
      }
    ];

    const routes = routesInfo.map( route => {
      return(
        <Route exact
          path = {route.path}
          render = {(props) =>
            <route.component {...props} />
          }
          key = {route.title}
        />
      )
    })

    return (
      <Router>
        <View>
          <FlatList
            data={[
              {
                key: 'Home',
                path: '/'

              },
              {
                key: 'Secret',
                path: '/secret'
              },
              {
                key: 'Login',
                path: '/login'
              }
            ]}
            renderItem={({item}) => <Link to={item.path} >{item.key}</Link>}
          />
          {routes}
        </View>
      </Router>
    )
  }
}
