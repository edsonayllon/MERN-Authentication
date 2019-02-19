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
    showError: false,
    message: '',
    showNullError: false,
    loading: false
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };


  sendEmail = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    if (this.state.email === '') {
      this.setState({
        showError: false,
        message: 'Email required',
        showNullError: true,
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
        } else if (res.status === 401) {
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
          onPress={this.signIn}
        />
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
