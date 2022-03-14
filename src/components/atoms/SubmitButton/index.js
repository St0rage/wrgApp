import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SubmitButton = ({label, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        backgroundColor: '#2D52E8',
        borderRadius: 6
    },
    label: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
        color: 'white'
    }
})