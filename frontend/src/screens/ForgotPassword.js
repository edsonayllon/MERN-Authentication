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
    email: '',
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
    if (this.state.email === '') {
      this.setState({
        message: 'Email required',
        loading: false
      });
    } else {
      try {
        const res = await fetch('http://localhost:4000/auth/forgot-password', {
          method: 'POST',
          body: JSON.stringify({ email: this.state.email }),
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
            await json;
            this.setState({
              message: json.message,
              serverSuccess: true
            });
            break;
          case 403:
            this.setState({
              message: json.message,
              serverSuccess: false
            });
            break;
          default:
            const error = new Error(res.error);
            throw error;
        };
      } catch (err) {
        console.error(err);
      }
    }
  }

  render() {
    console.log(this.state)
    return (
      <View>
        <Text style = {{fontWeight: 'bold'}}>Trouble Logging In?</Text>
        <Text>Enter your email and a link will be sent
         to re-enter your account.</Text>
        <Input
          placeholder="Email"
          type='email'
          name='email'
          onChangeText={this.onInputChange}
          value={this.state.email}
        />
        <Button
          isLoading = {this.state.loading}
          title='Send Password Reset'
          onPress={this.sendEmail}
        />
        <Text style={this.state.serverSuccess
        ? styles.loginSuccess : styles.loginFailure} >
          {this.state.message}
        </Text>
        <Text>OR</Text>
        <Link to="/register">
          <Text style={styles.link}>Create a new account</Text>
        </Link>
        <Link to="/login">
          <Text style={styles.link}>Return to Login</Text>
        </Link>
      </View>
    );
  }
}
