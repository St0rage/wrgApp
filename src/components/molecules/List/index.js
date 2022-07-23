import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { currencyFormat, showMessage } from '../../../utils';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import axios from 'axios';
import {url, token} from '../../../config';
import { useDispatch } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize'

const List = ({name, price = false, id, func = null}) => {
    const [showAlert, setShowAlert] = useState(false);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const openAlert = useCallback(() => {
        setShowAlert(true)
    }, [])

    const closeAlert = useCallback(() => {
        setShowAlert(false)
    }, [])

    const deleteCostumer = () => {
        dispatch({type: 'SET_LOADING', value: true})
        axios.delete(url + `gas/costumers/${id}`, {
            headers: {
                'Authorization': token
            }
        })
        .then(res => {
            setShowAlert(false)
            dispatch({type: 'SET_LOADING', value: false})
            dispatch({type: 'REFRESH_COSTUMERS'})
            showMessage(res.data.data.message, 'success')
        })
        .catch(err => {
            setShowAlert(false)
            dispatch({type: 'SET_LOADING', value: false})
            showMessage(err.response.data.data.message, 'danger')
        })   
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{name}</Text>
                {
                    price ? (
                        <Text style={styles.desc}>{currencyFormat(price)}</Text>
                    ) : (
                        <></>
                    )
                }
            </View>
            {
                price ? (
                    <TouchableOpacity activeOpacity={0.7} style={styles.button(price)} onPress={() => navigation.navigate('UpdateGasPrice', {id})} >
                        <Text style={styles.label(price)}>Ubah Harga</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity activeOpacity={0.7} style={styles.button(price)} onPress={openAlert} >
                        <Text style={styles.label(price)}>Hapus</Text>
                    </TouchableOpacity>
                )
            }

            <SCLAlert 
                theme="warning"
                show={showAlert}
                title="Peringatan!!"
                subtitle="Tekan Tombol Hapus Untuk Menghapus Pelanggan Ini" 
                onRequestClose={closeAlert}
            >
                <SCLAlertButton theme="info" onPress={closeAlert} >Batal</SCLAlertButton>
                <SCLAlertButton theme="danger" onPress={deleteCostumer} >Hapus</SCLAlertButton>
            </SCLAlert>
        </View>
    )
}

export default List

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#B3B3B3',
    },
    title: {
        fontSize: RFValue(16),
        fontWeight: '500',
        color: 'black'
    },
    desc: {
        fontSize: RFValue(13),
        fontWeight: '500',
        color: '#797979'
    },
    button: (price) => ({
        padding: 8,
        borderRadius: 4,
        backgroundColor: price ? '#2DE834' : '#E82D2D'
    }),
    label: (price) => ({
        fontSize: RFValue(13), 
        fontWeight: '400',
        color:  price ? 'black' : 'white'
    })
})