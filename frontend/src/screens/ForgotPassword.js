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
    loading: false
  }

  onInputChange = (key, value) => {
    this.setState(prevState => ({
      ...prevState,
      [key]: value
    }))
  }


  sendEmail = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      message: ''
    });
    if (this.state.email === '') {
      this.setState({
        message: 'Email required',
        loading: false
      });
    } else {
      fetch('http://localhost:4000/apilocation', {
        method: 'POST',
        body: JSON.stringify(this.state.email),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      })
      .then(res => {
        if (res.status === 200) {
          res.json().then(json => {
            this.setState({
              message: json.message,
            });
          });
        } else if (res.status === 403) {
          res.json().then(json => {
            this.setState({
              message: json.message,
            });
          });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
    }
  };

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
        <Text style={this.state.loginSuccess
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
