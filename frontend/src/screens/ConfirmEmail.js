import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Link } from '../navigation';
import styles from '../stylesheet';

export default class ConfirmEmail extends Component {
  state = {
    message: '',
    loading: false,
    serverSuccess: false,
    verified: false,
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
        `http://localhost:4000/auth/verify-email?user=${user}&token=${token}`, {
        method: 'GET',
      });
      const json = await res.json();
      this.setState({
        message: json.message,
        verified: json.verified
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <View>
        <Text style = {{fontWeight: 'bold'}}>Email Confirmation</Text>
        <Text>
          {this.state.message}
        </Text>
        { this.state.verified
          ? <Link to="/login">
              <Text style={styles.link}>Return to Login</Text>
            </Link>
          : <Link to="/register">
              <Text style={styles.link}>Return to Register</Text>
            </Link>
        }

      </View>
    );
  }
}
