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
      <Text style={[styles.buttonText]}>{title}</Text>
      {
        isLoading && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator color={'white'} />
          </View>
        )
      }
    </View>
  </TouchableOpacity>
)
