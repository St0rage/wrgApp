import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

const HomeNota = () => {
  return (
    <View style={styles.page}>
      <Text style={styles.text}>NOTA</Text>
      <Text style={styles.text}>DALAM</Text>
      <Text style={styles.text}>PENGEMBANGAN</Text>
    </View>
  )
}

export default HomeNota

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: RFValue(25),
    color: '#0A0A0A',
    textAlign: 'center'
  }
})