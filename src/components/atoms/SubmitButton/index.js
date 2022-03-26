import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SubmitButton = ({label, onPress, type = 'default'}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container(type)} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
    container: type => ({
        paddingVertical: 12,
        backgroundColor: type == 'default' ? '#2D52E8' : '#E82D2D',
        borderRadius: 6
    }),
    label: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
        color: 'white'
    }
})