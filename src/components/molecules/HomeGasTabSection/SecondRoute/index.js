import axios from 'axios';
import qs from 'qs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { GasNoteDetailSet, GasNoteItem, Search } from '../..';
import { token, url } from '../../../../config';
import { showMessage } from '../../../../utils';
import { RFValue } from 'react-native-responsive-fontsize'

const SecondRoute = () => {
    const [notes, setNotes] = useState([]);
    const [detail, setDetail] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [totalNote, setTotalNote] = useState(0);

  
    const dispatch = useDispatch();
    const { refreshGasHome } = useSelector((state) => state.globalReducer);
    const flatListRef = useRef();
    const refRBSheet = useRef();
  
    useEffect(() => {
        if (refreshGasHome == 0) {
            return
        }
        flatListRef.current.scrollToOffset({animated: false, offset: 0})
        setPage(0)
        dispatch({type: 'SET_LOADING', value: true})
        const getGasNote1 = axios.get(url + 'gas/notes/1', { headers: { 'Authorization': token }})
        const countGasNote1 = axios.get(url + 'gas/notes/count/1', { headers: { 'Authorization': token }})
    
        axios
        .all([getGasNote1, countGasNote1])
        .then(
            axios.spread((...response) => {
                const resGasNote1 = response[0];
                const resCountGasNote1 = response[1];

                setNotes(resGasNote1.data.data);
                setTotalNote(resCountGasNote1.data.data);
    
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
    
        const getGasNote1 = axios.get(url + 'gas/notes/1', { headers: { 'Authorization': token }, params: {'page': page}})
        const countGasNote1 = axios.get(url + 'gas/notes/count/1', { headers: { 'Authorization': token }})
    
        axios
        .all([getGasNote1, countGasNote1])
        .then(
            axios.spread((...response) => {
              const resGasNote1 = response[0];
              const resCountGasNote1 = response[1];
    
              if (page !== 0) {
                setNotes((data) => [...data, ...resGasNote1.data.data] );
              } else {
                setNotes(resGasNote1.data.data);
                setTotalNote(resCountGasNote1.data.data);
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
              taken_at={item.taken_at}
              status={item.status} 
              func={showBottomSheet}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: 'center', fontSize: RFValue(20), paddingTop: 50 }}>Catatan Masih Kosong</Text>
          )}
        />

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
            <GasNoteDetailSet detail={detail} />
        </RBSheet>
      </View>
    )    
}

export default SecondRoute

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
    }
})