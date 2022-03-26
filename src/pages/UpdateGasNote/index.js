import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FormHeader } from '../../components'
import { Gap, TextInput, SubmitButton } from '../../components'
import { Picker } from '@react-native-picker/picker'
import { IcCounterMinus, IcCounterPlus } from '../../assets'
import axios from 'axios'
import { token, url } from '../../config'
import { currencyFormat, showMessage } from '../../utils'
import { useDispatch } from 'react-redux'
import qs from 'qs'
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';


const UpdateGasNote = ({route, navigation}) => {
    const [gasDetail, setGasDetail] = useState({
        gas_name: '',
        gas_price: '',
    }) 
    const [data, setData] = useState({
        name: '',
        quantity: 0,
        gas_id: 0
    })
    const [showAlert, setShowAlert] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [deletedMessage, setDeletedMessage] = useState('')

    const { id } = route.params;
    const dispatch = useDispatch();


    useEffect(() => {
        if (id !== 0 || id !== '') {
            dispatch({type: 'SET_LOADING', value: true})
            axios.get(url + `gas/notedetail/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
            .then(res => {
                const response = res.data.data[0]
                setData(prev => ({...prev, name: response.name}))
                setData(prev => ({...prev, quantity: parseInt(response.quantity)}))
                setData(prev => ({...prev, gas_id: response.gas_id}))
                setGasDetail(prev => ({...prev, gas_name: response.gas_name}))
                setGasDetail(prev => ({...prev, price: response.price}))
                dispatch({type: 'SET_LOADING', value: false})
            })
        }
    }, [id])

    const submit = () => {
        const newData = {...data}
        delete newData.name;

        dispatch({type: 'SET_LOADING', value: true})
        axios.put(url + `gas/note/${id}`, qs.stringify(newData), {
            headers: {
                'Authorization': token
            }
        })
        .then(res => {
            const msg = res.data.data.message
            dispatch({type: 'SET_MSG', value: msg})
            dispatch({type: 'SET_LOADING', value: false})
            navigation.pop()
        })
        .catch(err => {
            dispatch({type: 'SET_LOADING', value: false})
            showMessage(err.response.data.data.quantity, 'danger')
        })
    }

    const closeSuccessDelete = () => {
        setShowSuccess(false)
        navigation.replace('MainApp', {screen: 'Gas'})
    }

    const deleteNote = () => {
        setShowAlert(false)
        axios.delete(url + `gas/note/${id}`, {
            headers: {
                'Authorization': token
            }
        })
        .then(res => {
            setDeletedMessage(res.data.data.message)
            setShowSuccess(true)
        })
    }

    return (
        <View style={styles.page}>
        <FormHeader title="Ubah Catatan" />
        <Gap height={24} />
        <View style={styles.wrapper}>
            <TextInput label="Nama" value={data.name} editable={false} />
            <Gap height={20} />
            <Text style={styles.label}>Jenis</Text>
            <View style={styles.picker}>
                <Picker >
                    <Picker.Item label={`${gasDetail.gas_name} : ${currencyFormat(gasDetail.price)}`} />
                </Picker>
            </View>
            <Gap height={20} />
            <Text style={styles.label}>Kuantitas</Text>
            <View style={styles.counter}>
                <TouchableOpacity style={styles.counterMinus} onPress={() => data.quantity != 0 ? setData({...data, quantity: data.quantity -1 }) : setData({...data, quantity: 0})} >
                    <IcCounterMinus />
                </TouchableOpacity>
                <View style={styles.counterQty}>
                    <Text style={styles.counterNumber}>{data.quantity}</Text>
                </View>
                <TouchableOpacity style={styles.counterPlus} onPress={() => setData({...data, quantity: data.quantity + 1})} >
                    <IcCounterPlus />
                </TouchableOpacity>
            </View>
            <Gap height={44} />
            <SubmitButton label="Ubah Catatan" onPress={submit} />
            <Gap height={20} />
            <SubmitButton label="Hapus Catatan" type='del' onPress={() => setShowAlert(true)} />

            <SCLAlert 
                theme="warning"
                show={showAlert}
                title="Peringatan!!"
                subtitle="Tekan Tombol Hapus Untuk Menghapus Catatan Ini" 
                onRequestClose={() => {}}
                useNativeDriver={true}
            >
                <SCLAlertButton theme="info" onPress={() => setShowAlert(false)} >Batal</SCLAlertButton>
                <SCLAlertButton theme="danger" onPress={deleteNote} >Hapus</SCLAlertButton>
            </SCLAlert>

            <SCLAlert 
                theme="success"
                show={showSuccess}
                title="Sukses"
                subtitle={deletedMessage} 
                onRequestClose={() => {}}
                useNativeDriver={false}
            >
                <SCLAlertButton theme="success" onPress={closeSuccessDelete} >Selesai</SCLAlertButton>
            </SCLAlert>
        </View>
        </View>
    )
}

export default UpdateGasNote

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