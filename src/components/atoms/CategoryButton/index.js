import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const CategoryButton = ({label, id, func, active}) => {
  
  const onPress = () => {
    func(id, label)
  }

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container(active)} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

export default CategoryButton

const styles = StyleSheet.create({
    container: (active) => ({
        backgroundColor: active ? '#2D52E8' : '#E82D2D',
        paddingHorizontal: 12,
        paddingVertical: 11,
        borderRadius: 10,
        marginRight: 5,
    }),
    label: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
    }
})