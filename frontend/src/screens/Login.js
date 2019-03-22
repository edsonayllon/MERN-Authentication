import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage
} from 'react-native';
import { Input, Button } from '../components';
import { Link } from '../navigation';
import styles from '../stylesheet';

export default class Login extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    loading: false,
    message: '',
    loginSuccess: false
  }

  _storeToken = async (token) => {
    try {
      const jsonItem = await AsyncStorage.setItem("JWT_TOKEN", JSON.stringify(token));
      return jsonItem
    } catch (err) {
      console.log(err.message)
    }
  };

  onInputChange = (key, value) => {
    this.setState(prevState => ({
      user: {
          ...prevState.user,
          [key]: value
      },
    }))
  }

  signIn = async (e) => {
    e.preventDefault();
    this.setState({loading: true});
    try {
      const res = await fetch('http://localhost:4000/auth/authenticate', {
        method: 'POST',
        body: JSON.stringify(this.state.user),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      });
      const json = await res.json();
      const status = await res.status;
      await json
      this.setState({ loading: false });
      switch(status) {
        case 200:
          this._storeToken( json.token );
          await this.setState({
            message: json.message,
            loginSuccess: true,
          });
          this.props.history.push('/secret')
          break;
        case 401:
          this.setState({
            message: json.message,
            loginSuccess: false,
            loading: false
          });
          break;
        default:
          const error = new Error(res.error);
          throw error;
      }
    } catch (err) {
      console.error(err);
      this.setState({
        message: 'Error connecting to server, check internet connection',
        loginSuccess: false
      });
    }
  }

  render() {
    return (
      <View>
        <Text>Login Below!</Text>
        <Input
            placeholder="Email"
            type='email'
            name='email'
            onChangeText={this.onInputChange}
            value={this.state.user.email}
          />
        <Input
            placeholder="Password"
            type='password'
            name='password'
            onChangeText={this.onInputChange}
            value={this.state.user.password}
            secureTextEntry
          />
        <Link to="/forgot-password">
          <Text style={styles.link}>Forgot Password?</Text>
        </Link>
        <Button
          isLoading = {this.state.loading}
          title='Sign In'
          onPress={this.signIn}
          />
        <Text style={this.state.loginSuccess
        ? styles.loginSuccess : styles.loginFailure} >
          {this.state.message}
        </Text>
        <Link to="/register">
          <Text style={styles.link}>Create a new account</Text>
        </Link>
      </View>
    );
  }
}
