import { StyleSheet, Text, View, TextInput as TextInputRN } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

const TextInput = ({label, placeholder, ...restProps}) => {
  return (
    <View>
        <Text style={styles.label}>{label}</Text>
        <TextInputRN placeholder={placeholder} placeholderTextColor='#76777A' style={styles.input} {...restProps} />
    </View>
  )
}

export default TextInput

const styles = StyleSheet.create({
    label: {
        fontSize: RFValue(16),
        fontWeight: '400',
        color: '#2E2F32',
        marginBottom: 15
    },
    input: {
        borderWidth: 1,
        borderColor: '#D5D5D5',
        padding: 10,
        borderRadius: 6
    }
})