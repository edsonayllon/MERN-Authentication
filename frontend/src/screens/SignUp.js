import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { Link } from '../navigation/nav-modules';
import styles from '../stylesheet';

export default class SignUp extends Component {
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
    let user = {...this.state.user};
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [key]: value
      }
    }))
  }

  signUp = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    fetch('http://localhost:4000/api/register', {
      method: 'POST',
      body: JSON.stringify(this.state.user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      this.setState({loading: false});
      if (res.status === 200) {
        res.json().then(json => {
          this.setState({
            message: json.message,
            loginSuccess: true
          });
        });
        this.props.history.push('/login')
      } else if (res.status === 400) {
          res.json().then(json => {
            this.setState({
              message: json.message,
              loginSuccess: false
            });
          });
        } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error signing up, please try again');
    });
  }

  render() {
    console.log(JSON.stringify(this.state))
    return (
      <View>
        <Text>Register Below!</Text>
        <Input
          placeholder="Email"
          type='email'
          name='email'
          onChangeText={this.onInputChange}
          value={this.state.email}
        />
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
          type='password'
          name='password'
          onChangeText={this.onInputChange}
          value={this.state.passwordConfirm}
          secureTextEntry
        />
        <Button
          title='Sign Up'
          onPress={this.signUp.bind(this)}
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
