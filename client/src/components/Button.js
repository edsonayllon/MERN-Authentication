import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

const styles = {
  button: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 12,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    letterSpacing: 0.5,
  },
}

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
