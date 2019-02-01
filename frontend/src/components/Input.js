import React from 'react'
import { TextInput } from 'react-native'

import styles from '../stylesheet';

export default ({ placeholder, onChangeText, type, ...props }) => (
  <TextInput
    autoCapitalize='none'
    autoCorrect={false}
    style={[styles.input]}
    placeholder={placeholder}
    placeholderTextColor="#666"
    onChangeText={value => onChangeText(type, value)}
    underlineColorAndroid='transparent'
    {...props}
  />
)
