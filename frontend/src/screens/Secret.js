import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

export default class Secret extends React.Component {
  state = {
    message: 'Loading..'
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/secret')
      .then(res => res.text())
      .then(api => {
        this.setState({ message:  api})
      });
  }

  render() {
    return (
      <View>
        <Text>Secret</Text>
        <Text>{this.state.message}</Text>
      </View>
    );
  }
}
