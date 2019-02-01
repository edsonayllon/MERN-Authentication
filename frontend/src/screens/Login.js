import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import Input from '../components/Input';

export default class ComponentName extends React.Component {
  state = {
    email: '',
    password: ''
  }

  onInputChange = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3001/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
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
            value={this.state.email}
          />
        <Input
            placeholder="Password"
            type='password'
            name='password'
            onChangeText={this.onInputChange}
            value={this.state.password}
            secureTextEntry
          />

        <Input
            type='Submit'
            value='Submit'
          />
      </View>
    );
  }
}
