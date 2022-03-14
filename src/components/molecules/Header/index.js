import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IcBurgerMenu } from '../../../assets'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Header = ({onPress}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
            <IcBurgerMenu style={styles.icon} />
        </TouchableOpacity> 
        <Text style={styles.title}>Warung Rahmat Gas</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 24
    },
    icon: { width: 32, height: 32, padding: 5 },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
        marginLeft: 26
    }
})