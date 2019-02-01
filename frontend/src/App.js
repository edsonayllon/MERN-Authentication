import React, { Component } from 'react';
import { View } from 'react-native';
import MainRouter from './navigation/MainRouter';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from './stylesheet';

EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  $primaryColor: '#007FFF',
  $secondaryColor: '#999',
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MainRouter />
      </View>
    );
  }
}
