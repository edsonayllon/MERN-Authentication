import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';


export default class ForgotPassword extends Component {
  state = {
    email: '',
    showError: false,
    message: '',
    showNullError: false,
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };


  sendEmail = (e) => {
    e.preventDefault();
    const { email } = this.state;
    if (email === '') {
      this.setState({
        showError: false,
        message: '',
        showNullError: true,
      });
    } else {
      componentDidMount() {
         fetch('http://localhost:4000/forgot-password', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           }
         })
         .then(res => res.json())
         .then(api => {
           this.setState({ apiState:  api})
         });
       }

      axios
        .post('http://localhost:3003/forgotPassword', {
          email,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data === 'recovery email sent') {
            this.setState({
              showError: false,
              messageFromServer: 'recovery email sent',
              showNullError: false,
            });
          }
        })
        .catch((error) => {
          console.error(error.response.data);
          if (error.response.data === 'email not in db') {
            this.setState({
              showError: true,
              messageFromServer: '',
              showNullError: false,
            });
          }
        });
    }
  };

  render() {
    return (

    );
  }
}
