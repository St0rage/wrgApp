import { StyleSheet, Text, View } from 'react-native'
import React, { version } from 'react'

const HomeGas = () => {
  return (
    <View style={styles.page}>
      <Text style={styles.text}>GAS</Text>
      <Text style={styles.text}>DALAM</Text>
      <Text style={styles.text}>PENGEMBANGAN</Text>
    </View>
  )
}

export default HomeGas

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#0A0A0A',
    textAlign: 'center'
  }
})