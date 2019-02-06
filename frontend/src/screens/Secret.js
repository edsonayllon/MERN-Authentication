import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage
} from 'react-native';
import { Button } from '../components';

export default class Secret extends Component {
  state = {
    message: 'Loading..',
    loading: false
  }

  logout = () => {
    this.setState({loading: true});
    this.removeItemValue("JWT_TOKEN").then( success => {
      if (success) {
        this.setState({loading: false});
        this.props.history.push('/login');
      } else {
        this.setState({loading: false});
      }
    });
  }

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  componentDidMount() {
    this.retrieveItem("JWT_TOKEN").then((token) => {
      fetch("http://localhost:4000/api/secret", {
        method: "GET",
        headers: {
          'authorization': 'Bearer ' + token
        }
      })
      .then(res => res.text())
      .then(api => {
        this.setState({ message:  api})
      });
    }).catch((error) => {
      //this callback is executed when your Promise is rejected
      console.log('Promise is rejected with error: ' + error);
    });
  }

  async retrieveItem(key) {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
  }

  render() {
    return (
      <View>
        <Text>Secret</Text>
        <Text>{this.state.message}</Text>
        <Button
          isLoading = {this.state.loading}
          title='Logout'
          onPress={this.logout}
          />
      </View>
    );
  }
}
