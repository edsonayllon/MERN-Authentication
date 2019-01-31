import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

export default class Home extends React.Component {
  state = {
    message: 'Loading..'
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/home')
      .then(res => res.json())
      .then(api => {
        this.setState({ message:  api})
      });
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
