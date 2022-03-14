import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FormHeader = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default FormHeader

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingLeft: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#D5D5D5'
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#232323'
    }
})