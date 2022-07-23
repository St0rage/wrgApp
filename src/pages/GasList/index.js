import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FormHeader, List } from '../../components';
import { token, url } from '../../config';
import { showMessage } from '../../utils';
import { RFValue } from 'react-native-responsive-fontsize'

const GasList = () => {
    const [gas, setGas] = useState([]);
    
    const dispatch = useDispatch()
    const msg = useSelector((state) => state.globalReducer)
    const { refreshGasList } = useSelector((state) => state.globalReducer)
    const didMount = useRef(false)

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
        dispatch({type: 'SET_LOADING', value: true})
            axios.get(url + 'gas', {
                headers: {
                    'Authorization' : token
                }
            })
            .then(res => {
                setGas(res.data.data)
                dispatch({type: 'SET_LOADING', value: false})
            })
            .catch(err => {
                dispatch({type: 'SET_LOADING', value: false})
                showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
            })
    }, [refreshGasList])

    return (
        <View style={styles.page}>
            <FormHeader title="Daftar Gas" />
            <FlatList 
                data={gas}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => (
                    <List 
                        name={item.name}
                        price={item.price}
                        id={item.id}
                    />
                )}
                ListEmptyComponent={() => (
                    <Text style={{ textAlign: 'center', fontSize: RFValue(20), paddingTop: 50 }}>Daftar Gas Kosong</Text>
                )}
            />
        </View>
    )
}

export default GasList

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white'     
    },
    gap: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#B3B3B3'
    }

})