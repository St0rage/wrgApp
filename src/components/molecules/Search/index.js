import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

const Search = ({placeholder, radius = 14, ...props}) => {
  return (
    <View>
      <TextInput style={styles.input(radius)} placeholder={placeholder} placeholderTextColor={"#76777A"} {...props} />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  input: (radius) => ({
    borderWidth: 1,
    borderColor: '#D5D5D5',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: radius
  })
})