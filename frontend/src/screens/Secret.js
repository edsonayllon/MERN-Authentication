import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

export default class Secret extends Component {
  state = {
    message: 'Loading..'
  }

  componentDidMount() {
    fetch('http://localhost:4000/api/secret')
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
