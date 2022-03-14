import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { CheckBoxInput, FormHeader, Gap, SubmitButton, TextInput } from '../../components';
import { token, url } from '../../config';
import { showMessage, useForm } from '../../utils';
import qs from 'qs';

const AddProduct = () => {
  const [resetBox, doResetBox] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [categoryId, setCategoryId] = useState([]);
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState('');
  const [image, setImage] = useState('');
  const [form, setForm] = useForm({
    product_name : '',
    price : '',
  })

  const evenCategories = categories.filter((e, i) => i % 2 === 0);
  const oddCategorries = categories.filter((e, i) => i % 2 !== 0);
  const dispatch = useDispatch();

  const getId = (id, action = 'set' ) => {
    if (action === 'set') {
      setCategoryId(arr => [...arr, id]);
    } else {
      setCategoryId(categoryId.filter(arr => arr !== id))
    }
  }
  
  
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
        showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
      })
    }, [])
  )

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    axios.get(url + 'categories', {
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      setCategories(res.data.data)
      setRefreshing(false)
    })
    .catch(err => {
      setRefreshing(false)
      showMessage('Gagal terhubung ke server, hubungi admin', 'danger');
    })
  }, [])

  const uploadImage = () => {
    launchCamera({includeBase64: true, mediaType: 'photo'}, (response) => {
      if (response.didCancel || response.errorCode) {
        showMessage('Foto tidak dipilih', 'warning')
      } else {
        const source = { uri: response.assets[0].uri }
        const imageString = `data:image/jpeg;base64,${response.assets[0].base64}`
        setPhoto(source)
        setImage(imageString)
      }
    })
  }

  const onSubmit = () => {
    const data = {
      ...form,
      category_id: [
        ...categoryId
      ],
      image
    }
    
    if (image === '') {
      delete data.image;
    }

    dispatch({type: 'SET_LOADING', value: true})
    axios.post(url + 'products', qs.stringify(data), {
      headers : {
        'Authorization' : token
      }
    })
    .then(res => {
      setForm('reset');
      setCategoryId([]);
      setImage('');
      setPhoto('');
      doResetBox(prev => prev + 1);
      dispatch({type: 'SET_LOADING', value: false})
      showMessage(res.data.data.message, 'success')
    })
    .catch(err => {
      const error = err.response
      if (error === undefined) {
        dispatch({type: 'SET_LOADING', value: false})
        showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
      } else {
        const errMsgs = err.response.data.data
        let msg = ''
        let objLength = (Object.keys(errMsgs).length) - 1
        Object.values(errMsgs).forEach((val, i) => {
          if (i !== objLength) {
            msg += val + '\n\n'
          } else {
            msg += val
          }
        })
        dispatch({type: 'SET_LOADING', value: false})
        showMessage(msg, 'danger')
      }
    })
  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
      <View style={styles.page}>
        <FormHeader title="Tambah Produk" />
        <Gap height={24} />
        <View style={styles.wrapper}>
          <TextInput label="Nama Produk" placeholder="Masukan nama produk" value={form.product_name} onChangeText={(value) => setForm('product_name', value) } />
          <Gap height={20} />
          <TextInput label="Harga" placeholder="Masukan harga produk" value={form.price} onChangeText={(value) => setForm('price', value) } />
          <Gap height={20} />
          <View>
            <Text style={styles.label}>Kategori</Text>
            <View style={styles.categories}>
              <View style={styles.section1}>
                {
                  evenCategories.map((e, i) => (
                    <CheckBoxInput label={e.category_name} id={e.id} key={i} func={getId} resetBox={resetBox} />
                  ))
                }
              </View>
              <View>
                {
                  oddCategorries.map((e, i) => (
                    <CheckBoxInput label={e.category_name} id={e.id} key={i} func={getId} resetBox={resetBox} />
                  ))
                }
              </View>
            </View>
          </View>
          <Gap height={20} />
          <View>
            <Text style={styles.label}>Gambar</Text>
            <TouchableOpacity style={styles.image} activeOpacity={0.7} onPress={uploadImage}>
              {
                photo ? (
                  <Image style={styles.image} source={photo} />
                ) : (
                  <View style={styles.image}>
                    <Text style={styles.imageLabel}>Tambah</Text>
                    <Text style={styles.imageLabel}>Gambar</Text>
                  </View>
                )
              }
            </TouchableOpacity>
          </View>
          <Gap height={44} />
          <SubmitButton label="Tambahkan Produk" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  )
}

export default AddProduct

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 20
  },
  wrapper: {
    paddingHorizontal: 20
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2E2F32',
    marginBottom: 15
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  section1: {
    marginRight: 40
  },
  image: {
    width: 70,
    height: 80,
    backgroundColor: '#EEEEEE',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#EEEEEE',
    borderWidth: 1
  },
  imageLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#424242'
  }
})