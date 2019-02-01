import React, { Component } from 'react';
import {
  View,
  FlatList
} from 'react-native';
import { Router, Link, Route } from './nav-modules';
import Home from '../screens/Home';
import Secret from '../screens/Secret';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';


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
        component: SignIn,
        title: 'Sign In'
      },
      {
        path: '/register',
        component: SignUp,
        title: 'Sign Up'
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
              },
              {
                key: 'Register',
                path: '/register'
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
