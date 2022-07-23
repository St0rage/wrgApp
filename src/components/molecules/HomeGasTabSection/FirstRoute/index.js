import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import qs from 'qs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GasNoteItem, Search, GasNoteDetail } from '../..';
import { IcCreate } from '../../../../assets';
import { token, url } from '../../../../config';
import { showMessage } from '../../../../utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import { RFValue } from 'react-native-responsive-fontsize'


const FirstRoute = () => {
    const [notes, setNotes] = useState([]);
    const [detail, setDetail] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [totalNote, setTotalNote] = useState(0);
    
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const msg = useSelector((state) => state.globalReducer)
    const { refreshGasHome } = useSelector((state) => state.globalReducer)
    const didMount = useRef(false);
    const flatListRef = useRef();
    const refRBSheet = useRef();

  
    useEffect(() => {
      if (!didMount.current) {
        didMount.current = true;
        return; 
      }
      if (msg?.updateMsg) {
        showMessage(msg?.updateMsg, 'success');
        dispatch({type: 'SET_MSG', value: false})
      }
    }, [msg?.updateMsg])
  
    useEffect(() => {
        if (refreshGasHome == 0) {
            return
        }
        flatListRef.current.scrollToOffset({animated: false, offset: 0})
        setPage(0)
        dispatch({type: 'SET_LOADING', value: true})
        const getGasNote0 = axios.get(url + 'gas/notes/0', { headers: { 'Authorization': token }})
        const countGasNote0 = axios.get(url + 'gas/notes/count/0', { headers: { 'Authorization': token }})
    
        axios
        .all([getGasNote0, countGasNote0])
        .then(
            axios.spread((...response) => {
                const resGasNote0 = response[0];
                const resCountGasNote0 = response[1];

                setNotes(resGasNote0.data.data);
                setTotalNote(resCountGasNote0.data.data);
    
                dispatch({type: 'SET_LOADING', value: false})
            })
        )
        .catch(errors => {
            dispatch({type: 'SET_LOADING', value: false})
            showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
        })
    }, [refreshGasHome])
  
    // onEndReach
    useEffect(() => {
  
      if (page == 0) {
        dispatch({type: 'SET_LOADING', value: true})
      }
  
      const getGasNote0 = axios.get(url + 'gas/notes/0', { headers: { 'Authorization': token }, params: {'page': page}})
      const countGasNote0 = axios.get(url + 'gas/notes/count/0', { headers: { 'Authorization': token }})
  
      axios
      .all([getGasNote0, countGasNote0])
      .then(
          axios.spread((...response) => {
            const resGasNote0 = response[0];
            const resCountGasNote0 = response[1];
  
            if (page !== 0) {
              setNotes((data) => [...data, ...resGasNote0.data.data] );
            } else {
              setNotes(resGasNote0.data.data);
              setTotalNote(resCountGasNote0.data.data);
            }
  
            dispatch({type: 'SET_LOADING', value: false})
          })
        )
        .catch(errors => {
          dispatch({type: 'SET_LOADING', value: false})
          showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
        })
    }, [page])
  
    const liveSearch = (value) => {
      flatListRef.current.scrollToOffset({animated: false, offset: 0})
      if (value == '') {
        setPage(0)
      }
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
  
    const loadMore = () => {
      if ((page * 5) < totalNote) {
        setPage(page + 1)
      }
    }

    const showBottomSheet = useCallback((id) => {
      axios.get(url + `gas/notedetail/${id}`, {
        headers: {
          'Authorization': token
        }
      })
      .then(res => {
        setDetail(res.data.data)
      })
      refRBSheet.current.open()
    }, [])

    const updateStatus = useCallback((id) => {
      dispatch({type: 'SET_LOADING', value: true})
      refRBSheet.current.close()
      axios.put(url + `gas/statusnote/${id}`, {}, {
          headers: {
              'Authorization': token
          }
      })
      .then(res => {
          dispatch({type: 'SET_LOADING', value: false})
          dispatch({type: 'REFRESH_GAS_HOME'})
          showMessage(res.data.data.message, 'success')
      })
    }, [])
  
    return (
      <View style={styles.container}>
        <View style={styles.searchSection} >
            <Search radius={8} placeholder="Cari Nama" value={search} onChangeText={liveSearch} />
        </View>
        <FlatList
          contentContainerStyle={{ paddingBottom: 18 }}
          data={notes}
          onEndReached={() => { search == '' ? loadMore() : false }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          ref={flatListRef}
          renderItem={({item, index}) => (
            <GasNoteItem 
              id={item.id} 
              name={item.costumer_name} 
              desc={item.gas_name} 
              qty={item.quantity} 
              created_at={item.created_at} 
              updated_at={item.updated_at} 
              status={item.status} 
              func={showBottomSheet}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: 'center', fontSize: RFValue(20), paddingTop: 50 }}>Catatan Masih Kosong</Text>
          )}
        />
  
        <TouchableOpacity activeOpacity={0.7} style={styles.createButton} onPress={() => navigation.navigate('AddGasNote')}>
          <IcCreate style={{ width: 30, height: 30 }} />
        </TouchableOpacity>

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          closeOnPressBack={true}
          animationType="fade"
          customStyles={{ 
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            },
            container: {
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              height: '70%'
            },  
            draggableIcon: {
              width: 80,
              height: 2,
              marginTop: 5,
              borderRadius: 100,
              backgroundColor: '#000'
            }
           }}
        >
          <GasNoteDetail 
            detail={detail}
            func={updateStatus} 
          />
        </RBSheet>
      </View>
    )
};

export default FirstRoute

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