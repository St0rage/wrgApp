import { StyleSheet, View } from 'react-native'
import React from 'react'
import { IlWrg } from '../../assets'
import { useEffect } from 'react'

const SplashScreen = ({navigation}) => {

  useEffect(() => {
    setTimeout(() => {
        navigation.replace('MainApp')
    }, 100)
  }, [])
    
  return (
    <View style={{ backgroundColor: '#F0F0F0', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <IlWrg />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})