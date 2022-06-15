import { StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { FormHeader, List, Gap } from '../../components'
import { IcCreate } from '../../assets'
import { useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { token, url } from '../../config'
import { showMessage } from '../../utils'

const Costumers = ({navigation}) => {
  const [costumers, setCostumers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(0)

  const dispatch = useDispatch()

  const refreshCostumers = () => {
    setRefresh(refresh + 1);
  }

  useEffect(() => {
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
  }, [refresh])

  useFocusEffect(
    useCallback(() => {
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
    }, [])
  )

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    axios.get( url + 'gas/costumers', {
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      setCostumers(res.data.data)
      setRefreshing(false)
    })
    .catch(err => {
      setRefreshing(false)
      showMessage('Gagal terhubung ke server, hubungi admin', 'danger');
    })
  }, [])

  return (
    <View style={styles.page}>
      <FormHeader title="Daftar Pelanggan" />
      {
        costumers.length === 0 ? (
          <></>
        ) : (
          <View style={styles.gap} >
            <Gap height={24} />
          </View>
        )
      }
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {
          costumers.length === 0 ? (
            <Text style={{ textAlign: 'center', fontSize: 20, paddingTop: 50 }}>Daftar Pelanggan Masih Kosong</Text>
          ) : (
            costumers.map((e, i) => (
              <List name={e.name} key={i} id={e.id} func={refreshCostumers} />
            ))
          )
        }
      </ScrollView>
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