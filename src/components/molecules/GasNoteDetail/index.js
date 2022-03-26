import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modalbox'
import { useDispatch, useSelector } from 'react-redux'
import { Gap } from '../..'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { token, url } from '../../../config'
import { currencyFormat, dateFormat, showMessage } from '../../../utils'
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert'

const GasNoteDetail = () => {
  const [detail, setDetail] = useState([])
  const [showAlert, setShowAlert] = useState(false)

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { gasModal, gasModalId } = useSelector((state) => state.globalReducer)

  useEffect(() => {
      if (gasModalId !== '') {
        axios.get(url + `gas/notedetail/${gasModalId}`, {
            headers: {
              'Authorization': token
            }
        })
        .then(res => {
            setDetail(res.data.data[0])
        })
      }
  }, [gasModalId])

  const update = () => {
    dispatch({type: 'SET_MODAL', value: false})
    navigation.navigate('UpdateGasNote', {id: gasModalId})
  }

  const onClosedModal = () => {
    dispatch({type: 'SET_MODAL', value: false})
    dispatch({type: 'SET_MODAL_ID', value: ''})
  }

  const updateStatus = () => {
    setShowAlert(false)
    dispatch({type: 'SET_LOADING', value: true})
    axios.put(url + `gas/statusnote/${gasModalId}`, {}, {
        headers: {
            'Authorization': token
        }
    })
    .then(res => {
        dispatch({type: 'SET_LOADING', value: false})
        dispatch({type: 'SET_MODAL', value: false})
        dispatch({type: 'REFRESH_GAS_HOME'})
        showMessage(res.data.data.message, 'success')
    })
  }

  return (
    <Modal isOpen={gasModal} onClosed={onClosedModal} style={styles.modal} position={"bottom"} backdropPressToClose={false} backButtonClose={true} >
        <View style={styles.modalLine} />
        <View style={styles.modalContent} >
            <View>
                <Text style={styles.label}>Penitip</Text>
                <Gap height={8} />
                <Text style={styles.costumer}>{detail.name}</Text>
                <Gap height={6} />
                <Text style={styles.id}>#{detail.id}</Text>
                <Gap height={10} />
                <View style={styles.line(0.5)} />
            </View>
            <Gap height={20} />
            <View>
                <Text style={styles.label}>Detail</Text>
                <Gap height={10} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.detail('400')}>{detail.gas_name}</Text>
                    <Text style={styles.detail('400')}>{currencyFormat(detail.price)}</Text>
                </View>
                <Gap height={6} />
                <Text style={styles.detail('400')}>X{detail.quantity}</Text>
                <Gap height={8} />
                <View style={styles.line(1)} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                    <Text style={styles.detail('500')}>Total</Text>
                    <Text style={styles.detail('500')}>{currencyFormat(detail.total)}</Text>
                </View>
                <View style={styles.line(1)} />
            </View>
            <Gap height={16} />
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.date}>Tanggal dibuat</Text>
                    <Text style={styles.date}>{dateFormat(detail.created_at)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.date}>Tanggal diubah</Text>
                    <Text style={styles.date}>{detail.updated_at !== '' ? dateFormat(detail.updated_at) : '-'}</Text>
                </View>
            </View>
            <Gap height={30} />
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.button('#2DE834')} onPress={update} >
                        <Text style={styles.buttonText('black')}>Ubah</Text>
                    </TouchableOpacity>
                    <Gap width={8} />
                    <TouchableOpacity activeOpacity={0.7} style={styles.button('#2D52E8')} onPress={() => setShowAlert(true)} >
                        <Text style={styles.buttonText('white')}>Selesai</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <SCLAlert 
                theme="info"
                show={showAlert}
                title="Peringatan!!"
                subtitle="Tekan Tombol Selesai Untuk Mengubah Status Catatan Ini" 
                onRequestClose={() => {}}
                useNativeDriver={true}
            >
                <SCLAlertButton theme="info" onPress={() => setShowAlert(false)} >Batal</SCLAlertButton>
                <SCLAlertButton theme="success" onPress={updateStatus} >Selesai</SCLAlertButton>
            </SCLAlert>
        </View>
    </Modal>
  )
}

export default GasNoteDetail

const styles = StyleSheet.create({
    modal: { 
        alignItems: 'center', 
        height: 461,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    modalLine: {
        width: 80,
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 5,
    },
    modalContent: {
        flex: 1,
        width: '100%',
        marginTop: 25,
        paddingHorizontal: 40
        // backgroundColor: 'yellow'
    },
    label: {
        fontSize: 16,
        fontWeight: '400',
        color: '#797979',
    },
    costumer: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
    },
    id: {
        fontSize: 13,
        fontWeight: '400',
        color: '#797979',
    },
    line: width => ({
        width: '100%',
        borderWidth: width,
        borderColor: '#797979'
    }),
    detail: weight => ({
        fontSize: 16,
        fontWeight: weight,
        color: 'black'
    }),
    date: {
        fontSize: 14,
        fontWeight: '400',
        color: '#797979'
    },
    button: color => ({
        flex: 1,
        backgroundColor: color,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 5
    }),
    buttonText: color => ({
        fontSize: 14,
        fontWeight: '500',
        color: color
    })
})