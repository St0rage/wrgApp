import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FormHeader, Gap, TextInput, SubmitButton } from '../../components'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { token, url } from '../../config'
import { showMessage } from '../../utils'
import qs from 'qs';

const AddCostumers = () => {
  const [data, setData] = useState({
    name: ''
  })

  const dispatch = useDispatch()

  const onSubmit = () => {
    dispatch({type: 'SET_LOADING', value: true})
    axios.post(url + 'gas/costumers', qs.stringify(data), {
      headers: {
        'Authorization' : token
      }
    })
    .then(res => {
      setData({...data, name: ''})
      dispatch({type: 'SET_LOADING', value: false})
      showMessage(res.data.data.message, 'success')
    })
    .catch(err => {
      const error = err.response
      dispatch({type: 'SET_LOADING', value: false})
      error === undefined 
      ? showMessage('Gagal terhubung ke server, hubungi admin', 'danger') 
      : showMessage(err.response.data.data.name, 'danger')
    })
  }

  return (
    <View style={styles.page}>
      <FormHeader title="Tambah Pelanggan" />
      <Gap height={24} />
      <View style={styles.wrapper}>
        <TextInput label="Nama Pelanggan" placeholder="Masukan nama pelanggan" value={data.name} onChangeText={(value) => setData({...data, name: value})}  />
        <Gap height={44} />
        <SubmitButton label="Tambahkan Pelanggan" onPress={onSubmit} />
      </View>
    </View>
  )
}

export default AddCostumers

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white'
  },
  wrapper: {
    paddingHorizontal: 20
  }
})