import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FormHeader, Gap, List } from '../../components';
import { token, url } from '../../config';
import { showMessage } from '../../utils';

const GasList = () => {
    const [gas, setGas] = useState([]);

    const dispatch = useDispatch()
    const msg = useSelector((state) => state.globalReducer)

    useEffect(() => {
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
    }, [])

    return (
        <View style={styles.page}>
            <FormHeader title="Daftar Gas" />
            {
                gas.length === 0 ? (
                    <></>
                ) : (
                    <View style={styles.gap} >
                        <Gap height={24} />
                    </View>
                )
            }
            {
                gas.length === 0 ? (                    
                    <Text style={{ textAlign: 'center', fontSize: 20, paddingTop: 50 }}>Daftar Gas Kosong</Text>
                ) : (
                    gas.map((e, i) => (
                        <List name={e.name} price={e.price} key={i} id={e.id} />
                    ))
                )
            }
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