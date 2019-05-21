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
      newusername: ''
    },
    loading: false,
    username: '',
  }

  removeItemValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  retrieveItem = async (key) => {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
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
    key.split('.').map((item) => {
      return keys.push(item)
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
      this.setState(prevState => ({
        passwordReset: {
          ...prevState['passwordReset'],
          message: 'Passwords must match',
          loading: false,
          serverSuccess: false
        }
      }));
    } else if (this.state.passwordReset.newpassword === '' || this.state.passwordReset.newpasswordConfirm === '') {
      this.setState(prevState => ({
        passwordReset: {
          ...prevState['passwordReset'],
          message: 'Must a provide new password',
          loading: false,
          serverSuccess: false
        }
      }));
    } else {
      try {
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

  changeUsername = async (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      usernameReset: {
        ...prevState['usernameReset'],
        loading: true,
        message: ''
      }
    }))

    if (this.state.username === this.state.usernameReset.newusername) {
      this.setState(prevState =>({
        usernameReset: {
          ...prevState['usernameReset'],
          message: 'New usernames must be new',
          loading: false,
          serverSuccess: false
        }
      }));
    } else {
      try {
        const jwt = await this.retrieveItem("JWT_TOKEN");
        const res = await fetch('http://localhost:4000/api/change-username', {
          method: 'POST',
          body: JSON.stringify({
             newusername: this.state.usernameReset.newusername
          }),
          headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + jwt
          }
        });
        const json = await res.json();
        const status = await res.status;
        switch (status) {
          case 200:
            this.setState(prevState => ({
              ...prevState,
              username: this.state.usernameReset.newusername,
              usernameReset: {
                ...prevState['usernameReset'],
                message: json.message,
                serverSuccess: true,
                loading: false,
              }
            }));
            break;
          case 403:
            this.setState(prevState => ({
              usernameReset: {
                ...prevState['usernameReset'],
                message: json.message,
                serverSuccess: false,
                loading: false,
              }
            }));
            break;
          default:
            this.setState(prevState => ({
              usernameReset: {
                ...prevState['usernameReset'],
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

  async componentDidMount() {
    try {
      const jwt = await this.retrieveItem("JWT_TOKEN");
      const res = await fetch(
        "http://localhost:4000/api/change-username", {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + jwt
        }
      });
      if (res) {
        const json = await res.json()
        this.setState({
          username:  json.username
        })
      }
    } catch (err) {
      console.log('Promise is rejected with error: ' + err);
    }
  }

  render() {
    return (
      <View>
        <Text style={{fontWeight:'bolder', fontSize: 20}}>User Settings</Text>

        <Text style={{fontWeight:'bold', fontSize: 16, marginTop: 10}}>Username</Text>

        <Text>Current username: {this.state.username}</Text>

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
          onPress={this.changeUsername}
          />
        <Text>{this.state.usernameReset.message}</Text>

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
          placeholder="Confirm New Password"
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
