import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage
} from 'react-native';
import { Button, Input } from '../components';

export default class UserSettings extends Component {
  state = {
    passwordReset: {
      loading: false,
      message: '',
      serverSuccess: false,
      oldpassword: '',
      newpassword: '',
      newpasswordConfirm: ''
    },
    usernameReset: {
      loading: false,
      message: '',
      serverSuccess: false,
      oldusername: '',
      newusername: ''
    },
    loading: false,
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

  onInputChangeObject = (key, value) => {
    const keys = [];
    key.split('.').map((item) =>{
      keys.push(item)
    });
    this.setState(prevState => ({
      ...prevState,
      [keys[0]]: {
        ...prevState[keys[0]],
        [keys[1]]: value,
      }
    }))
  }

  changePassword = async (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      passwordReset: {
        ...prevState['passwordReset'],
        loading: true,
        message: ''
      }
    }))

    if (!(this.state.passwordReset.newpassword === this.state.passwordReset.newpasswordConfirm)) {
      this.setState({
        passwordReset: {
          message: 'Passwords must match',
          loading: false,
          serverSuccess: false
        }
      });
    } else if (this.state.passwordReset.newpassword === '' || this.state.passwordReset.newpasswordConfirm === '') {
      this.setState({
        passwordReset: {
          message: 'Must a provide new password',
          loading: false,
          serverSuccess: false
        }
      });
    } else {
      try {
        console.log(this.state.passwordReset)
        const jwt = await this.retrieveItem("JWT_TOKEN");
        const res = await fetch('http://localhost:4000/api/change-password', {
          method: 'POST',
          body: JSON.stringify({
             oldpassword: this.state.passwordReset.oldpassword,
             newpassword: this.state.passwordReset.newpassword
          }),
          headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + jwt
          }
        });
        const json = await res.json();
        const status = await res.status;
        await json;
        this.setState({ loading: false });
        console.log(json);
        switch (status) {
          case 200:
            this.setState(prevState => ({
              passwordReset: {
                ...prevState['passwordReset'],
                message: json.message,
                serverSuccess: true,
                loading: false,
              }
            }));
            break;
          case 403:
            this.setState(prevState => ({
              passwordReset: {
                ...prevState['passwordReset'],
                message: json.message,
                serverSuccess: false,
                loading: false,
              }
            }));
            break;
          default:
            this.setState(prevState => ({
              passwordReset: {
                ...prevState['passwordReset'],
                message: "Error connecting to server. Check your network",
                serverSuccess: false,
                loading: false,
              }
            }));
            const error = new Error(res.error);
            throw error;
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  render() {
    console.log(this.state)
    return (
      <View>
        <Text style={{fontWeight:'bolder', fontSize: 20}}>User Settings</Text>

        <Text style={{fontWeight:'bold', fontSize: 16, marginTop: 10}}>Username</Text>

        <Text> Your current username is: </Text>

        <Input
          placeholder="New Username"
          type='usernameReset.newusername'
          name='usernameReset.newusername'
          onChangeText={this.onInputChangeObject}
          value={this.state.usernameReset.newusername}
        />

        <Button
          isLoading = {this.state.loading}
          title='Change Username'
          onPress={this.logout}
          />

        <Text style={{fontWeight:'bold', fontSize: 16, marginTop: 10}}>Change Password</Text>
        <Input
          placeholder="Current Password"
          type='passwordReset.oldpassword'
          name='passwordReset.oldpassword'
          onChangeText={this.onInputChangeObject}
          value={this.state.passwordReset.oldpassword}
          secureTextEntry
        />
        <Input
          placeholder="New Password"
          type='passwordReset.newpassword'
          name='passwordReset.newpassword'
          onChangeText={this.onInputChangeObject}
          value={this.state.passwordReset.newpassword}
          secureTextEntry
        />
        <Input
          placeholder="Confirm Password"
          type='passwordReset.newpasswordConfirm'
          name='passwordReset.newpasswordConfirm'
          onChangeText={this.onInputChangeObject}
          value={this.state.passwordReset.newpasswordConfirm}
          secureTextEntry
        />
        <Button
          isLoading = {this.state.passwordReset.loading}
          title='Change Password'
          onPress={this.changePassword}
          />
        <Text>{this.state.passwordReset.message}</Text>

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
