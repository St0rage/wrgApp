import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

const MiniCategory = ({label}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  )
}

export default MiniCategory

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        backgroundColor: '#2D52E8',
        borderRadius: 6,
        marginRight: 3,
        marginTop: 4
    },
    text: {
        fontSize: RFValue(10),
        fontWeight: '500',
        color: 'white'
    }
})