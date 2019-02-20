import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Input, Button } from '../components';
import { Link } from '../navigation';
import styles from '../stylesheet';

export default class ForgotPassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
    message: '',
    loading: false,
    serverSuccess: false,
  }

  onInputChange = (key, value) => {
    this.setState(prevState => ({
      ...prevState,
      [key]: value
    }))
  }

  sendEmail = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      message: ''
    })
    if (!(this.state.password === this.state.passwordConfirm)) {
      this.setState({
        message: 'Passwords must match',
        loading: false
      });
    } else {
      try {
        const res = fetch('http://localhost:4000/api/forgot-password', {
          method: 'POST',
          body: JSON.stringify({ email: this.state.password }),
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const json = await res.json();
        const status = await res.status;
        await json;
        this.setState({ loading: false });

        switch (status) {
          case 200:
            this.setState({
              message: json.message,
              serverSuccess: true
            });
          case 403:
            this.setState({
              message: json.message,
              serverSuccess: false
            });
          default:
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
        <Text style = {{fontWeight: 'bold'}}>Reset your password</Text>
        <Input
          placeholder="New password"
          type='password'
          name='password'
          onChangeText={this.onInputChange}
          value={this.state.password}
        />
        <Input
          placeholder="Re-enter new password"
          type='passwordConfirm'
          name='passwordConfirm'
          onChangeText={this.onInputChange}
          value={this.state.passwordConfirm}
        />
        <Button
          isLoading = {this.state.loading}
          title='Update Password'
          onPress={this.sendEmail}
        />
        <Text style={this.state.serverSuccess
        ? styles.loginSuccess : styles.loginFailure} >
          {this.state.message}
        </Text>
        <Text>OR</Text>
        <Link to="/login">
          <Text style={styles.link}>Return to Login</Text>
        </Link>
      </View>
    );
  }
}
