import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import { useDispatch } from 'react-redux';
import { FormHeader, Gap, SubmitButton } from '../../components';
import { token, url } from '../../config';
import { showMessage } from '../../utils';
import { RFValue } from 'react-native-responsive-fontsize'

const DeleteCategory = () => {
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [showAlert, setShowAlert] = useState(false)
  const [category_id, setCategoryId] = useState(0)

  const dispatch = useDispatch();
  const didMount = useRef(false);

  const openAlert = useCallback(() => {
    if (category_id == 0 || category_id == 'pilih kategori') {
      showMessage('Pilih Kategori Terlebih dahulu', 'warning')
      return
    }
    setShowAlert(true);
  }, [category_id])

  const closeAlert = useCallback(() => {
    setShowAlert(false);
  }, [])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return; 
    }
    dispatch({type: 'SET_LOADING', value: true})
      axios.get(url + 'categories', {
        headers: {
          'Authorization': token
        }
      })
      .then(res => {
        setCategories(res.data.data);
        dispatch({type: 'SET_LOADING', value: false});
      })
      .catch(err => {
        dispatch({type: 'SET_LOADING', value: false});
        showMessage('Gagal terhubung ke server, hubungi admin', 'danger');
      })
  }, [refresh])

  useFocusEffect(
    useCallback(() => {
      dispatch({type: 'SET_LOADING', value: true})
      axios.get(url + 'categories', {
        headers: {
          'Authorization': token
        }
      })
      .then(res => {
        setCategories(res.data.data);
        dispatch({type: 'SET_LOADING', value: false});
      })
      .catch(err => {
        dispatch({type: 'SET_LOADING', value: false});
        showMessage('Gagal terhubung ke server, hubungi admin', 'danger');
      })
    }, [])
  )

  const onSubmit = () => {
    dispatch({type: 'SET_LOADING', value: true})
    axios.delete( url + `categories/${category_id}`, {
      headers: {
        'Authorization': token
      }
    })
      .then(res => {
        setShowAlert(false)
        dispatch({type: 'SET_LOADING', value: false});
        showMessage(res.data.data.message, 'success');
        setRefresh(refresh + 1);
      })
      .catch(err => {
        setShowAlert(false)
        const error = err.response;
        if (error === undefined) {
          dispatch({type: 'SET_LOADING', value: false})
          showMessage('Gagal terhubung ke server, hubungi admin', 'danger');
        } else {
          dispatch({type: 'SET_LOADING', value: false})
          showMessage(err.response.data.data.message, 'danger');
        }
      })
    setCategoryId(0)
  }
  
  return (
    <ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false} >
      <View style={styles.page}>
        <FormHeader title="Hapus Kategori" />
        <Gap height={24} />
        <View style={styles.wrapper}>
          <Text style={styles.label}>Kategori</Text>
          <View style={styles.picker}>
            <Picker selectedValue={category_id} onValueChange={(itemValue) => setCategoryId(itemValue) } >
              <Picker.Item label="Pilih Kategori" value="pilih kategori" />
              {
                categories.map((e, i) => (
                  <Picker.Item label={e.category_name} value={e.id} key={i} />
                ))
              }
            </Picker>
          </View>
          <Gap height={44} />
          <SubmitButton label="Hapus Kategori" onPress={openAlert} />
        </View>
      </View>

      <SCLAlert 
        theme="warning"
        show={showAlert}
        title="Peringatan!!"
        subtitle="Tekan Tombol Hapus Untuk Menghapus Kategori Ini" 
        onRequestClose={closeAlert}
      >
        <SCLAlertButton theme="info" onPress={closeAlert} >Batal</SCLAlertButton>
        <SCLAlertButton theme="danger" onPress={onSubmit} >Hapus</SCLAlertButton>
      </SCLAlert>
    </ScrollView>
  )
}

export default DeleteCategory

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white'
  },
  wrapper: {
    paddingHorizontal: 20
  },
  label: {
    fontSize: RFValue(16),
    fontWeight: '400',
    color: '#2E2F32',
    marginBottom: 15
  },
  picker: {
    borderWidth: 1,
    borderColor: '#D5D5D5',
    padding: 0,
    borderRadius: 6
  }
})