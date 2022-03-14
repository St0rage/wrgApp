import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0E3BEF" />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})