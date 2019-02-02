import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import styles from '../stylesheet';

export default ({ title, onPress, isLoading }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.button}>
      {
        isLoading ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator color={'blue'} />
          </View>
        ) : <Text style={[styles.buttonText]}>{title}</Text>
      }
    </View>
  </TouchableOpacity>
)
