import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { launchCamera } from 'react-native-image-picker'
import { useDispatch } from 'react-redux'
import { CheckBoxInput, CheckBoxInputSet, FormHeader, Gap, SubmitButton, TextInput } from '../../components'
import { token, url } from '../../config'
import qs from 'qs';
import { showMessage } from '../../utils'
import { RFValue } from 'react-native-responsive-fontsize'

const UpdateProduct = ({route, navigation}) => {
  const [categories, setCategories] = useState([]);
  const [category_id, setCategoryId] = useState([]);
  const [photo, setPhoto] = useState('');
  const [data, setData] = useState({
    product_name: '',
    price: '',
    image: '',
    old_image: ''
  })

  const { id } = route.params;
  const evenCategories = categories.filter((e, i) => i % 2 === 0);
  const oddCategories = categories.filter((e, i) => i % 2 !== 0);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch({type: 'SET_LOADING', value: true});
      const getCategories = axios.get(url + 'categories', { headers: { 'Authorization': token } });
      const getSingleProduct = axios.get(url + `products/${id}`, { headers: { 'Authorization': token } });

      axios
        .all([getCategories, getSingleProduct])
        .then(
          axios.spread((...responses) => {
            const resCategories = responses[0].data.data;
            const resSingleProduct = responses[1].data.data;

            const tempCategoryId = resSingleProduct.category.filter(e => e.id).map(obj => obj.id)
            
            // categories
            setCategories(resCategories)
            // singleProduct
            setCategoryId(tempCategoryId)
            setData(prev => ({...prev, product_name: resSingleProduct.product_name}))
            setData(prev => ({...prev, price: resSingleProduct.price}))
            setData(prev => ({...prev, image: resSingleProduct.image}))
            setData(prev => ({...prev, old_image: resSingleProduct.image}))
            setPhoto(resSingleProduct.image)
            dispatch({type: 'SET_LOADING', value: false});
          })
        )
    }, [])
  )

  const getId = useCallback((id, action = 'set' ) => {
    if (action === 'set') {
      setCategoryId(arr => [...arr, id])
    } else {
      setCategoryId(category_id.filter(arr => arr !== id))
    }
  }, [category_id])

  const uploadImage = () => {
    launchCamera({quality: 0.3, width: 250, includeBase64: true, mediaType: 'photo'}, (response) => {
      if (response.didCancel || response.errorCode) {
        showMessage('Foto tidak dipilih', 'warning')
      } else {
        const source = response.assets[0].uri
        const imageString = `data:image/jpeg;base64,${response.assets[0].base64}`
        setPhoto(source)
        setData({...data, image: imageString})
      }
    })
  }

  const submit = () => {
    const newData = {
      ...data,
      category_id
    };
    
    if (newData.image === data.old_image) {
      delete newData.old_image
    }

    dispatch({type: 'SET_LOADING', value: true})
    axios.put(url + `products/${id}`, qs.stringify(newData), {
      headers: {
        'Authorization' : token
      }
    })
    .then(res => {
      const msg = res.data.data.message
      dispatch({type: 'SET_MSG', value: msg})
      navigation.pop()
    })
    .catch(err => {
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
    })
  }
  
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.page}>
        <FormHeader title="Ubah Produk" />
        <Gap height={24} />
        <View style={styles.wrapper}>
          <TextInput label="Nama Produk" value={data.product_name} placeholder="Masukan nama produk"  onChangeText={(value) => setData({...data, product_name: value})} />
          <Gap height={20} />
          <TextInput label="Harga" value={data.price} placeholder="Masukan harga produk" onChangeText={(value) => setData({...data, price: value})} />
          <Gap height={20} />
          <View>
            <Text style={styles.label}>Kategori</Text>
            <View style={styles.categories}>
              <View style={styles.section1}>
                {
                  evenCategories.map((e, index) => {
                    if (category_id.includes(e.id)) {
                      return (
                        <CheckBoxInputSet func={getId} id={e.id} label={e.category_name} key={index} />
                      )
                    } else {
                      return (
                        <CheckBoxInput func={getId} id={e.id} label={e.category_name} key={index} />
                      )
                    }
                  })
                }
              </View>
              <View>
                {
                  oddCategories.map((e, index) => {
                    if (category_id.includes(e.id)) {
                      return (
                        <CheckBoxInputSet func={getId} id={e.id} label={e.category_name} key={index} />
                      )
                    } else {
                      return (
                        <CheckBoxInput func={getId} id={e.id} label={e.category_name} key={index} />
                      )
                    }
                  })
                }
              </View>
            </View>
          </View>
          <Gap height={20} />
          <View>
            <Text style={styles.label}>Gambar</Text>
            <TouchableOpacity style={styles.image} activeOpacity={0.7} onPress={uploadImage} >
              {
                photo ? (
                  <Image style={styles.image} source={{ uri: photo }} />
                ) : (
                  <View style={styles.image}>
                    <Text style={styles.imageLabel}>Gambar</Text>
                  </View>
                )
              }
            </TouchableOpacity>
          </View>
          <Gap height={44} />
          <SubmitButton label="Ubah Produk" onPress={submit} />
        </View>
      </View>
    </ScrollView>
  )
}

export default UpdateProduct

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
    fontSize: RFValue(16),
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
    justifyContent: 'center'
  }
})