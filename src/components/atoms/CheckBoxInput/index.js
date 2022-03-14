import CheckBox from '@react-native-community/checkbox'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CheckBoxInput = ({ label, id, func, resetBox}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  useEffect(() => {
    setToggleCheckBox(false)
  }, [resetBox])

  const onChange = (value) => {
    setToggleCheckBox(value)

    if (value === true) {
      func(id)
    } else {
      func(id, 'unset')
    }
  }

  return (
    <View style={styles.container}>
      <CheckBox 
        disabled={false}
        value={toggleCheckBox} 
        onValueChange={onChange}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  )
  
  
}

export default CheckBoxInput

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },  
  label: {
    fontSize: 12,
    fontWeight: '400',
    color: 'black'
  }
})