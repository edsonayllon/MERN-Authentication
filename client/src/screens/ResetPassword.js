import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Input, Button } from '../components';
import { Link } from '../navigation';
import styles from '../stylesheet';
import config from '../config';

export default class ForgotPassword extends Component {
  state = {
    password: '',
    passwordConfirm: '',
    message: '',
    tokenMessage: '',
    loading: false,
    serverSuccess: false,
    expiredToken: true,
  }

  onInputChange = (key, value) => {
    this.setState(prevState => ({
      ...prevState,
      [key]: value,
    }))
  }

  async componentDidMount() {
    try {
      let token = await this.props.match.params.token; //reads the url
      let user = await this.props.match.params.user;
      const res = await fetch(
        `${config.API_ADDR}/auth/forgot-password-reset?user=${user}&token=${token}`, {
        method: 'GET',
      });
      const json = await res.json();
      if (!json.verfied) {
        this.setState({
          tokenMessage: json.message,
          expiredToken: true
        })
      } else {
        this.setState({
          tokenMessage: json.message,
          expiredToken: false
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  resetPassword = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      message: ''
    })
    let token = await this.props.match.params.token; //reads the url
    let user = await this.props.match.params.user;

    if (!(this.state.password === this.state.passwordConfirm)) {
      this.setState({
        message: 'Passwords must match',
        loading: false,
        serverSuccess: false
      });
    } else {
      try {
        const res = await fetch(`${config.API_ADDR}/auth/password-reset`, {
          method: 'POST',
          body: JSON.stringify({
            email: user,
            password: this.state.password,
            token: token,
          }),
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
              serverSuccess: true,
              loading: false,
            });
            break;
          case 403:
            this.setState({
              message: json.message,
              serverSuccess: false,
              loading: false,
            });
            break;
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
    return (
      <View>
        <Text style={this.state.expiredToken
        ? styles.loginFailure : styles.loginSuccess} >
          {this.state.tokenMessage}
        </Text>
        <Text style = {{fontWeight: 'bold'}}>Reset your password</Text>
        <Input
          placeholder="Password"
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
          title='Update Password'
          onPress= { this.resetPassword }
        />
        <Text style={this.state.serverSuccess
        ? styles.loginSuccess : styles.loginFailure} >
          { this.state.message }
        </Text>
        <Text>OR</Text>
        <Link to="/login">
          <Text style={styles.link}>Return to Login</Text>
        </Link>
      </View>
    );
  }
}
