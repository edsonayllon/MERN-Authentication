import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Input, Button } from '../components';
import { Link } from '../navigation';
import styles from '../stylesheet';

export default class Register extends Component {
  state = {
    user: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    loading: false,
    message: '',
    loginSuccess: false
  }

  onInputChange = (key, value) => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [key]: value
      }
    }))
  }

  signUp = async (e) => {
    e.preventDefault();
    if (!(this.state.user.password === this.state.user.passwordConfirm)) {
      this.setState({ message: 'Passwords must match' });
    } else if (this.state.user.password === '') {
      this.setState({ message: 'Must enter a password' });
    } else if (this.state.user.email === '') {
      this.setState({ message: 'Must enter a username' });
    } else {
      try {
        this.setState({
          loading: true,
          message: '',
        });
        const res = await fetch('http://localhost:4000/auth/register', {
          method: 'POST',
          body: JSON.stringify(this.state.user),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await res.json();
        const status = await res.status;
        await json
        this.setState({ loading: false });

        switch(status) {
          case 200:
            await json
            this.setState({
              message: json.message,
              loginSuccess: true,
              loading: false
            });
            break;
          case 400:
            this.setState({
              message: json.message,
              loginSuccess: false,
              loading: false,
            });
            break;
          default:
            this.setState({
              message: json.message,
              loginSuccess: false,
              loading: false
            });
            const error = new Error(res.error);
            throw error;
        }
      } catch (err) {
        console.error(err);
        this.setState({
          message: 'Error connecting to server, check internet connection',
          loginSuccess: false
        });
      }
    }
  }

  render() {
    return (
      <View>
        <Text>Register Below!</Text>
        <Input
          placeholder="Email"
          type='email'
          name='email'
          onChangeText={this.onInputChange}
          value={this.state.user.email}
        />
        <Input
          placeholder="Password"
          type='password'
          name='password'
          onChangeText={this.onInputChange}
          value={this.state.user.password}
          secureTextEntry
        />
        <Input
          placeholder="Confirm Password"
          type='passwordConfirm'
          name='passwordConfirm'
          onChangeText={this.onInputChange}
          value={this.state.user.passwordConfirm}
          secureTextEntry
        />
        <Button
          title='Sign Up'
          onPress={this.signUp}
          isLoading = {this.state.loading}
        />
        <Text style={this.state.loginSuccess
        ? styles.loginSuccess : styles.loginFailure} >
          {this.state.message}
        </Text>
        <Link to="/login">
          <Text style={styles.link}>Already own an account? Login</Text>
        </Link>
      </View>
    );
  }
}
