// withAuth.jsx
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Redirect } from '../navigation/nav-modules';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    state = {
      loading: true,
      redirect: false,
    }

    async componentDidMount() {
      try {
        const token = await this.retrieveItem("JWT_TOKEN");
        const res = await fetch("http://localhost:4000/auth/checkToken", {
          method: "GET",
          headers: {
            "Authorization": 'Bearer ' + token
          }
        });
        const status = await res.status;
        switch (status) {
          case 200:
            this.setState({ loading: false });
            break;
          default:
            const error = new Error(res.error);
            throw error;
        }
      } catch (err) {
        console.error(err);
        this.setState({ loading: false, redirect: true });
      }
    }

    async retrieveItem(key) {
      try {
        const retrievedItem =  await AsyncStorage.getItem(key);
        const item = JSON.parse(retrievedItem);
        return item;
      } catch (error) {
        console.log(error.message);
      }
      return
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}
