import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { FormHeader, Gap, SubmitButton, TextInput } from '../../components'
import { token, url } from '../../config'
import qs from 'qs'
import { showMessage } from '../../utils'

const UpdateGasPrice = ({route, navigation}) => {
    const [data, setData] = useState({
        name: '',
        price: ''
    })

    const dispatch = useDispatch();

    const {id} = route.params;

    useFocusEffect(
        useCallback(() => {
            dispatch({type: 'SET_LOADING', value: true})
            axios.get(url + `gas/${id}`, {
                headers: {
                    'Authorization' : token
                }
            })
            .then(res => {
                const data = res.data.data;
                setData(prev => ({...prev, name: data.name}))
                setData(prev => ({...prev, price: data.price}))
                dispatch({type: 'SET_LOADING', value: false})
            })
            .catch(err => {
                dispatch({type: 'SET_LOADING', value: false})
            })
        }, [])
    )

    const submit = () => {
        axios.put(url + `gas/${id}`, qs.stringify({'price' : data.price}), {
            headers: {
                'Authorization' : token
            }
        })
        .then(res => {
            const msg = res.data.data.message
            dispatch({type: 'SET_MSG', value: msg})
            navigation.pop()
        })
        .catch(err => {
            const msg = err.response.data.data
            showMessage(msg.price ? msg.price : msg.message, 'danger');
        })
    }    

    return (
        <View style={styles.page}>
        <FormHeader title="Ubah Harga Gas" />
        <Gap height={24} />
        <View style={styles.wrapper}>
            <TextInput label="Nama" value={data.name} editable={false} />
            <Gap height={20} />
            <TextInput label="Harga" value={data.price} onChangeText={(value) => setData({...data, price: value}) } />
            <Gap height={44} />
            <SubmitButton label="Ubah Harga Gas" onPress={submit} />
        </View>
        </View>
    )
}

export default UpdateGasPrice

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white'
    },
    wrapper: {
        paddingHorizontal: 16
    }
})