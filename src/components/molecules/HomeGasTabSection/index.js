import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import { Search, GasNoteItem } from '..';
import { IcCreate } from '../../../assets';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {url, token} from '../../../config'
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from '../../../utils';
import qs from 'qs'

const FirstRoute = () => {
  const [notes, setNotes] = useState([])
  const [search, setSearch] = useState('')
  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const msg = useSelector((state) => state.globalReducer)
  const { refreshGasHome } = useSelector((state) => state.globalReducer)

  useEffect(() => {
    if (msg?.updateMsg) {
      showMessage(msg?.updateMsg, 'success');
      dispatch({type: 'SET_MSG', value: false})
    }
  }, [msg?.updateMsg])

  useEffect(() => {
    dispatch({type: 'SET_LOADING', value: true})
      axios.get(url + 'gas/notes/0', {
        headers: {
          'Authorization': token
        }
      })
      .then(res => {
        setNotes(res.data.data);
        dispatch({type: 'SET_LOADING', value: false})
      })
      .catch(err => {
        dispatch({type: 'SET_LOADING', value: false})
        showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
      })
  }, [refreshGasHome])

  useFocusEffect(
    useCallback(() => {
      dispatch({type: 'SET_LOADING', value: true})
      axios.get(url + 'gas/notes/0', {
        headers: {
          'Authorization': token
        }
      })
      .then(res => {
        setNotes(res.data.data);
        dispatch({type: 'SET_LOADING', value: false})
      })
      .catch(err => {
        dispatch({type: 'SET_LOADING', value: false})
        showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
      })
    }, [])
  )

  const liveSearch = (value) => {
    setSearch(value)

    axios.post(url + 'gas/searchnotes', qs.stringify({'keyword': value, 'status': '0'}), {
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      setNotes(res.data.data)
    })
    .catch(err => {
      showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchSection} >
          <Search radius={8} placeholder="Cari Nama" value={search} onChangeText={liveSearch} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
          <View style={{ paddingBottom: 18 }}>
              {
                notes.length === 0 ? (
                  <Text style={{ textAlign: 'center', fontSize: 20, paddingTop: 50 }}>Catatan Masih Kosong</Text>
                ) : (
                  notes.map((e, i) => (
                    <GasNoteItem 
                      id={e.id} 
                      name={e.costumer_name} 
                      desc={e.gas_name} 
                      qty={e.quantity} 
                      created_at={e.created_at} 
                      updated_at={e.updated_at} 
                      status={e.status} 
                      key={i}  
                    />
                  ))
                )
              }
          </View>
      </ScrollView>
      <TouchableOpacity activeOpacity={0.7} style={styles.createButton} onPress={() => navigation.navigate('AddGasNote')}>
        <IcCreate style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
    </View>
  )
};

const SecondRoute = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const { refreshGasHome } = useSelector((state) => state.globalReducer)

  useEffect(() => {
    dispatch({type: 'SET_LOADING', value: true})
      axios.get(url + 'gas/notes/1', {
        headers: {
          'Authorization': token
        }
      })
      .then(res => {
        setNotes(res.data.data)
        dispatch({type: 'SET_LOADING', value: false})

      })
      .catch(err => {
        dispatch({type: 'SET_LOADING', value: false})
        showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
      })
  }, [refreshGasHome])

  useFocusEffect(
    useCallback(() => {
      dispatch({type: 'SET_LOADING', value: true})
      axios.get(url + 'gas/notes/1', {
        headers: {
          'Authorization': token
        }
      })
      .then(res => {
        setNotes(res.data.data)
        dispatch({type: 'SET_LOADING', value: false})

      })
      .catch(err => {
        dispatch({type: 'SET_LOADING', value: false})
        showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
      })
    }, [])
  )

  const liveSearch = (value) => {
    setSearch(value)

    axios.post(url + 'gas/searchnotes', qs.stringify({'keyword': value, 'status': '1'}), {
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      setNotes(res.data.data)
    })
    .catch(err => {
      showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchSection} >
          <Search radius={8} placeholder="Cari Nama" value={search} onChangeText={liveSearch} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: 18 }}>
            {
              notes.length === 0 ? (
                <Text style={{ textAlign: 'center', fontSize: 20, paddingTop: 50 }}>Catatan Masih Kosong</Text>
              ) : (
                notes.map((e, i) => (
                  <GasNoteItem 
                    id={e.id} 
                    name={e.costumer_name} 
                    desc={e.gas_name} 
                    qty={e.quantity} 
                    taken_at={e.taken_at}
                    status={e.status} 
                    key={i}  
                  />
                ))
              )
            }
          </View>
      </ScrollView>
    </View>
  )
  
}

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute
})

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'black'}}
    style={{ backgroundColor: 'white' }}
    labelStyle={{ fontWeight: '500', color: 'black' }}
  />
);

const HomeGasTabSection = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'first', 'title': 'Belum Diambil'},
    {key: 'second', 'title': 'Diambil'}
  ])

  return (
    <TabView 
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
  )
}

export default HomeGasTabSection

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    searchSection: {
        paddingHorizontal: 16,
        paddingVertical: 15,
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
      bottom: 16,
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