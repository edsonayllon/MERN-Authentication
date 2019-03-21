import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage
} from 'react-native';
import { Button, Input } from '../components';

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
        const api = await res.text()
        this.setState({ message:  api})
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
        <Text style={{fontWeight:'bolder', fontSize: 20}}>User Settings</Text>

        <Text style={{fontWeight:'bold', fontSize: 16, marginTop: 10}}>Username</Text>

        <Text> Your current username is: </Text>

        <Input
          placeholder="New Username"
          type='newusername'
          name='newusername'
          onChangeText={this.onInputChange}
          value={this.state.password}
          secureTextEntry
        />

        <Button
          isLoading = {this.state.loading}
          title='Change Username'
          onPress={this.logout}
          />

        <Text style={{fontWeight:'bold', fontSize: 16, marginTop: 10}}>Change Password</Text>
        <Input
          placeholder="Current Password"
          type='oldpassword'
          name='oldpassword'
          onChangeText={this.onInputChange}
          value={this.state.oldpassword}
          secureTextEntry
        />
        <Input
          placeholder="New Password"
          type='password'
          name='password'
          onChangeText={this.onInputChange}
          value={this.state.password}
          secureTextEntry
        />
        <Input
          placeholder="Confirm Password"
          type='passwordConfirm'
          name='passwordConfirm'
          onChangeText={this.onInputChange}
          value={this.state.passwordConfirm}
          secureTextEntry
        />
        <Button
          isLoading = {this.state.loading}
          title='Change Password'
          onPress={this.logout}
          />

        <View style={{borderWidth: 0.5, borderColor:'black', margin: 10}}></View>

        <Button
          isLoading = {this.state.loading}
          title='Logout'
          onPress={this.logout}
          />
      </View>
    );
  }
}
