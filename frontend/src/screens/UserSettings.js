import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage
} from 'react-native';
import { Button } from '../components';

export default class UserSettings extends Component {
  state = {
    message: 'Loading..',
    loading: false
  }

  logout = async () => {
    try {
      this.setState({ loading: true });
      const success = await this.removeItemValue("JWT_TOKEN");
      if (success) {
        this.setState({loading: false});
        this.props.history.push('/login');
      }
    } catch (err) {
      this.setState({loading: false});
      console.log(err);
    }
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

  async componentDidMount() {
    try {
      const jwt = await this.retrieveItem("JWT_TOKEN");
      const res = await fetch(
        "http://localhost:4000/api/secret", {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + jwt
        }
      });
      if (res) {
        this.setState({ message:  res.text()})
      }
    } catch (err) {
      console.log('Promise is rejected with error: ' + err);
    }
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
