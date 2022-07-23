import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { IcCreate } from '../../assets'
import { FormHeader, List } from '../../components'
import { token, url } from '../../config'
import { showMessage } from '../../utils'
import { RFValue } from 'react-native-responsive-fontsize'

const Costumers = ({navigation}) => {
  const [costumers, setCostumers] = useState([]);

  const dispatch = useDispatch()
  const { refreshCostumers } = useSelector((state) => state.globalReducer)
  const flatListRef = useRef();

  useEffect(() => {
    flatListRef.current.scrollToOffset({animated: false, offset: 0})
    dispatch({type: 'SET_LOADING', value: true})
      axios.get(url + 'gas/costumers', {
        headers: {
          'Authorization' : token
        }
      })
      .then(res => {
        setCostumers(res.data.data)
        dispatch({type: 'SET_LOADING', value: false})
      })
      .catch(err => {
        dispatch({type: 'SET_LOADING', value: false})
        showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
      })
  }, [refreshCostumers])

  return (
    <View style={styles.page}>
      <FormHeader title="Daftar Pelanggan" />
      <FlatList 
        data={costumers}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        ref={flatListRef}
        renderItem={({item, index}) => (
          <List 
            name={item.name}
            id={item.id}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center', fontSize: RFValue(20), paddingTop: 50 }}>Daftar Pelanggan Masih Kosong</Text>
        )}
      />
      <TouchableOpacity activeOpacity={0.7} style={styles.createButton} onPress={() => navigation.navigate('AddCostumers')}>
        <IcCreate style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
    </View>
  )
}

export default Costumers

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white'
  },
  gap: {
      borderBottomWidth: 0.5,
      borderBottomColor: '#B3B3B3'
  },
  createButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#2D52E8',
    borderRadius: 60/2,
    position: 'absolute',
    bottom: 30,
    right: 16,
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  }
})