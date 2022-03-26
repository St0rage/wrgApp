import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import qs from 'qs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { CategoryButton, Gap, Header, ProductItem, Search } from '../../components';
import { token, url } from '../../config';
import { showMessage } from '../../utils';

const HomeProduct = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [activeLabel, setActiveLabel] = useState('Semua');
  const [curCategoryId, setCurCategoryId] = useState('');
  const [search, setSearch] = useState('');
  
  const dispatch = useDispatch();
  const scroll = useRef()

  useFocusEffect(
    useCallback(() => {
      setActiveLabel('Semua')
      setCurCategoryId('')
      scroll.current.scrollTo({x: 0 ,y: 0, animated: true})
      dispatch({type: 'SET_LOADING', value: false})
      dispatch({type: 'SET_LOADING', value: true})
      const getCategories = axios.get(url + 'categories', { headers: { 'Authorization': token } })
      const getProducts = axios.get(url + 'products', { headers: { 'Authorization': token } })
      const getTotalProducts = axios.get(url + 'products/count', { headers: { 'Authorization': token } })

      axios
      .all([getCategories, getProducts, getTotalProducts])
      .then(
        axios.spread((...responses) => {
          const resCategories = responses[0];
          const resProducts = responses[1];
          const resTotalProducts = responses[2];

          setCategories(resCategories.data.data);
          setProducts(resProducts.data.data);
          setTotalProduct(resTotalProducts.data.data)

          dispatch({type: 'SET_LOADING', value: false})
        })
      )
      .catch(errors => {
        dispatch({type: 'SET_LOADING', value: false})
        showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
      }) 
      
    }, [])
  )

  useEffect(() => {
    if (curCategoryId != '') {
      dispatch({type: 'SET_LOADING', value: true})
      const getProductByCategory = axios.get(url + `products/category/${curCategoryId}`, { headers:{ 'Authorization' : token } })
      const getTotalProductByCategory = axios.get(url + `products/category/count/${curCategoryId}`, { headers:{ 'Authorization' : token } })

      axios
        .all([getProductByCategory, getTotalProductByCategory])
        .then(
          axios.spread((...responses) => {
            const resProductByCategory = responses[0]
            const resTotalProductByCategory = responses[1]

            setProducts(resProductByCategory.data.data);
            setTotalProduct(resTotalProductByCategory.data.data)

            dispatch({type: 'SET_LOADING', value: false})
          })
        )
        .catch((errors) => {
          dispatch({type: 'SET_LOADING', value: false})
          showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
        })
    } else {
      const getProducts = axios.get(url + 'products', { headers: { 'Authorization': token } })
      const getTotalProducts = axios.get(url + 'products/count', { headers: { 'Authorization': token } })

      axios
        .all([getProducts, getTotalProducts])
        .then(
          axios.spread((...responses) => {
            const resProducts = responses[0];
            const resTotalProducts = responses[1];

            setProducts(resProducts.data.data);
            setTotalProduct(resTotalProducts.data.data)

            dispatch({type: 'SET_LOADING', value: false})
          })
        )
        .catch(errors => {
          dispatch({type: 'SET_LOADING', value: false})
          showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
        })
    }
  }, [curCategoryId])

  const getProductByCategory = (id, label) => {
    setCurCategoryId(id)
    setActiveLabel(label)
    setSearch('')
  }

  const openImage = (uri) => {
    dispatch({type: 'SET_IMAGE_URI', value: uri})
    dispatch({type: 'SET_IMAGE_MODAL', value: true})
  }

  const liveSearch = (value) => {
    setSearch(value)

    if (curCategoryId === '') {
      axios.post(url + 'products/searchproduct', qs.stringify({'keyword' : value}) , {
        headers: {
          'Authorization': token
        }
      })
      .then(res => {
        setProducts(res.data.data)
      })
      .catch(err => {
        dispatch({type: 'SET_LOADING', value: false})
        showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
      })
    } else {
      axios.post(url + 'products/category/searchproduct', qs.stringify({'keyword' : value, 'id-category' : curCategoryId}) , {
        headers: {
          'Authorization': token
        }
      })
      .then(res => {
        setProducts(res.data.data)
      })
      .catch(err => {
        dispatch({type: 'SET_LOADING', value: false})
        showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
      })
    }
  }

  return (
    <View style={styles.page}>
      <View style={styles.wrapper}> 
        <Header onPress={() => navigation.toggleDrawer()} />
        <Gap height={24} />
        <Search placeholder="Cari Barang" value={search} onChangeText={liveSearch} />
      </View>
      <Gap height={16} />
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={scroll} >
          <View style={styles.categories}>
            {
              categories.length != 0 && (
                <CategoryButton label="Semua" id={""} func={getProductByCategory} active={activeLabel == 'Semua' ? true : false} />
              )
            }
            {
              categories.length == 0 ? (
                <Text style={{ textAlign: 'center', fontSize: 13}}>Kategori Masih Kosong</Text> 
              ) : (
                categories.map((e, i) => (
                  <CategoryButton label={e.category_name} id={e.id} func={getProductByCategory} key={i} active={activeLabel === e.category_name ? true : false} />
                ))
              )
            }
            
          </View>
        </ScrollView>
      </View>
      <Gap height={20} />
      <View style={styles.productInfo}>
        <Text style={styles.totalLabel} >Total Produk : {totalProduct}</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AddProduct')}>
          <Text style={styles.labelBtn}>Tambah Produk</Text>
        </TouchableOpacity>
      </View>
      <Gap height={18} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.items}>
          {

            products.length === 0 ? (
              <Text style={{ textAlign: 'center', fontSize: 20, paddingTop: 50 }}>Produk Masih Kosong</Text>
            ) : (
              products.map((e, i) => (
                <ProductItem 
                  title={e.product_name} 
                  desc={e.price} 
                  image={e.image} 
                  categories={e.category} 
                  key={i}
                  func={openImage}
                />
              ))
            )
            
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeProduct

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white'
  },
  wrapper: {
    paddingHorizontal: 16
  },
  categories: {
    flexDirection: 'row',
    paddingLeft: 16,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black'
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderRadius: 6,
    backgroundColor: '#2D52E8',
    fontWeight: '500'
  },
  labelBtn: {
    fontSize: 10,
    fontWeight: '500',
    color: 'white'
  },
  items: {
    paddingHorizontal: 16,
    paddingBottom: 16
  }

})