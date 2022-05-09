import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { FormHeader } from '../../components'
import { Gap, TextInput, SubmitButton } from '../../components'
import { Picker } from '@react-native-picker/picker'
import { IcCounterMinus, IcCounterPlus } from '../../assets'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { token, url } from '../../config'
import { currencyFormat, showMessage } from '../../utils'
import { useDispatch } from 'react-redux'
import qs from 'qs'

const AddGasNote = () => {
    const initialState = {
        costumer_id: '',
        gas_id: '',
        quantity : 0
    }
    const [data, setData] = useState(initialState)
    const [gasList, setGasList] = useState([])
    const [costumers, setCostumers] = useState([])

    const dispatch = useDispatch()

    useFocusEffect(
        useCallback(() => {
            setData({...initialState})
            dispatch({type: 'SET_LOADING', value: true})
            const getGasList = axios.get(url + 'gas', {headers: {'Authorization' : token}});
            const getCostumers = axios.get(url + 'gas/costumers', {headers: {'Authorization' : token}});
            axios
            .all([getGasList, getCostumers])
            .then(
                axios.spread((...responses) => {
                const resGasList = responses[0];
                const resCostumers = responses[1];

                setGasList(resGasList.data.data);
                setCostumers(resCostumers.data.data);
                
                dispatch({type: 'SET_LOADING', value: false})
                })
            )
            .catch(errors => {
                dispatch({type: 'SET_LOADING', value: false})
                showMessage('Gagal terhubung ke server, hubungi admin', 'danger')
            }) 
        }, [])
    )

    const submit = () => {
        dispatch({type: 'SET_LOADING', value: true})
        axios.post(url + 'gas/create', qs.stringify(data), {
            headers: {
                'Authorization' : token
            }
        })
        .then(res => {
            setData({...initialState})
            dispatch({type: 'SET_LOADING', value: false})
            showMessage(res.data.data.message, 'success')
        })
        .catch(err => {
            const error = err.response
            if (error === undefined) {
                dispatch({type: 'SET_LOADING', value: false})
                showMessage('Gagal terhubung ke server, hubungi admin', 'danger') 
            } else {
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
            }
        })
    }

    return (
        <View style={styles.page}>
        <FormHeader title="Tambah Catatan" />
        <Gap height={24} />
        <View style={styles.wrapper}>
            <View style={styles.picker}>
                <Picker selectedValue={data.costumer_id} onValueChange={(itemValue) => setData({...data, costumer_id: itemValue})} >
                    <Picker.Item label="Pilih Nama" value={false} />
                    {
                        costumers.map((e,i) => (
                            <Picker.Item label={e.name} value={e.id} key={i} />
                        ))
                    }
                </Picker>
            </View>
            <Gap height={20} />
            <Text style={styles.label}>Jenis</Text>
            <View style={styles.picker}>
                <Picker selectedValue={data.gas_id} onValueChange={(itemValue) => setData({...data, gas_id: itemValue})} >
                    <Picker.Item label="Pilih jenis gas" value={false} />
                    {
                        gasList.map((e,i) => (
                            <Picker.Item label={`${e.name} : ${currencyFormat(e.price)}`} value={e.id} key={i} />
                        ))
                    }
                </Picker>
            </View>
            <Gap height={20} />
            <Text style={styles.label}>Kuantitas</Text>
            <View style={styles.counter}>
                <TouchableOpacity style={styles.counterMinus} onPress={() => data.quantity != 0 ? setData({...data, quantity: data.quantity -1 }) : setData({...data, quantity: 0})}>
                    <IcCounterMinus />
                </TouchableOpacity>
                <View style={styles.counterQty}>
                    <Text style={styles.counterNumber}>{data.quantity}</Text>
                </View>
                <TouchableOpacity style={styles.counterPlus} onPress={() => setData({...data, quantity: data.quantity + 1})}>
                    <IcCounterPlus />
                </TouchableOpacity>
            </View>
            <Gap height={44} />
            <SubmitButton label="Tambahkan Catatan" onPress={submit} />
        </View>
        </View>
    )
}

export default AddGasNote

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white'
    },
    wrapper: {
        paddingHorizontal: 16
    },  
    label: {
        fontSize: 16,
        fontWeight: '400',
        color: '#2E2F32',
        marginBottom: 15
    },
    picker: {
        borderWidth: 1,
        borderColor: '#D5D5D5',
        padding: 0,
        borderRadius: 6,
    },
    counter: {
        flexDirection: 'row',
        borderWidth: 1,
        alignSelf: 'flex-start',
        borderRadius: 4,
        borderColor: '#D5D5D5',
    },
    counterMinus: {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4, 
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterQty: {
        width: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#D5D5D5',
    },
    counterNumber: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black'
    },
    counterPlus: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }
})