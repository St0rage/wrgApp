import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { dateFormat } from '../../../utils'

const GasNoteItem = ({status, id, name, desc, qty, created_at, updated_at, taken_at}) => {

  const dispatch = useDispatch();

  const detail = () => {
    if (status != '0') {
        dispatch({type: 'SET_MODAL1', value: true})
        dispatch({type: 'SET_MODAL_ID1', value: id})
    } else {
        dispatch({type: 'SET_MODAL', value: true})
        dispatch({type: 'SET_MODAL_ID', value: id})

    }
  }

  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={detail}>
        <View>
            <Text style={styles.id}>#{id}</Text>
            <Text style={styles.costumer}>{name}</Text>
            <Text style={styles.productName}>{`${desc} X${qty}`}</Text>
            <Text style={styles.status(status)}>{status != '0' ? 'Diambil' : 'Belum diambil'}</Text>
        </View>
        <View>
            {
                status != '0' ? (
                    <Text style={styles.date}>Diambil {dateFormat(taken_at)}</Text>
                ) : (
                    <>
                    <Text style={styles.date}>Dibuat {dateFormat(created_at)}</Text>
                    <Text style={[styles.date, styles.dateMargin]}>Diubah {updated_at != "" ? dateFormat(updated_at) : '-'}</Text>
                    </>
                )
            }
        </View>
    </TouchableOpacity>
  )
}

export default GasNoteItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: '#B3B3B3',
    },
    id: {
        fontSize: 12,
        fontWeight: '500',
        color: '#797979',
        marginBottom: 2
    },
    costumer: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
        marginBottom: 2
    },
    productName: {
        fontSize: 13,
        fontWeight: '500',
        color: '#797979',
        marginBottom: 5
    },
    status: (status) => ({
        fontSize: 11,
        fontWeight: '500',
        color: status != '0' ? '#E82D2D' : '#0E3BEF'
    }),  
    date: {
        fontSize: 13,
        color: '#797979',
        fontWeight: '500',
        textAlign: 'right',
    },
    dateMargin: {
        marginTop: 6
    }
})