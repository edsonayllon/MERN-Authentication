import React, { Component } from 'react';
import {
  View,
  FlatList
} from 'react-native';
import { Router, Link, Route } from './';
import {
  Home,
  Secret,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  ConfirmEmail,
  UserSettings
} from '../screens';
import withAuth from '../components/withAuth';


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
        component: withAuth(Secret),
        title: 'Secret'
      },
      {
        path: '/login',
        component: Login,
        title: 'Sign In'
      },
      {
        path: '/register',
        component: Register,
        title: 'Sign Up'
      },
      {
        path: '/forgot-password',
        component: ForgotPassword,
        title: 'Forgot Password'
      },
      {
        path: '/reset/:user/:token',
        component: ResetPassword,
        title: 'Reset Password'
      },
      {
        path: '/verify/:user/:token',
        component: ConfirmEmail,
        title: 'Email Verification'
      },
      {
        path: '/u/settings',
        component: withAuth(UserSettings),
        title: 'User Settings'
      }
    ];

    const routes = routesInfo.map( route => {
      return(
        <Route exact
          path = {route.path}
          render = {(props) =>
            <route.component {...props}  />
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
