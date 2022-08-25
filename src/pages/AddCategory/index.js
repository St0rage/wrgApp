import axios from 'axios';
import qs from 'qs';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { FormHeader, Gap, SubmitButton, TextInput } from '../../components';
import { token, url } from '../../config';
import { showMessage } from '../../utils';

const AddCategory = () => {
  const [data, setData] = useState({
    category_name: ''
  })

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch({type: 'SET_LOADING', value: true})
    axios.post( url + 'categories', qs.stringify(data), {
      headers: {
        'Authorization' : token
      }
    })
      .then(res => {
        setData({...data, category_name: ''})
        dispatch({type: 'SET_LOADING', value: false})
        showMessage(res.data.data.message, 'success')
      })
      .catch(err => {
        const error = err.response
        dispatch({type: 'SET_LOADING', value: false})
        error === undefined 
        ? showMessage('Gagal terhubung ke server, hubungi admin', 'danger') 
        : showMessage(err.response.data.data.category_name, 'danger')
      })
  }

  return (
    <View style={styles.page}>
      <FormHeader title="Tambah Kategori" />
      <Gap height={24} />
      <View style={styles.wrapper}>
        <TextInput label="Nama Kategori" placeholder="Masukan nama kategori" value={data.category_name} onChangeText={(value) => setData({...data, category_name: value})} />
        <Gap height={44} />
        <SubmitButton label="Tambahkan Kategori" onPress={onSubmit} />
      </View>
    </View>
  )
}

export default AddCategory

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white'
  },
  wrapper: {
    paddingHorizontal: 20
  }
})