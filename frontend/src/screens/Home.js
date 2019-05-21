import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

export default class Home extends Component {
  state = {
    message: 'Loading..'
  }

  async componentDidMount() {
    const res = await fetch('http://localhost:4000/api/home');
    this.setState({ message: res.text() })
  }

  render() {
    return (
      <View>
        <Text>Home</Text>
        <Text>{this.state.message}</Text>
      </View>
    );
  }
}
