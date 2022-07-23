import React, { memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { dateFormat } from '../../../utils'
import { RFValue } from 'react-native-responsive-fontsize'

const GasNoteItem = ({status, id, name, desc, qty, created_at, updated_at, taken_at, func}) => {

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => func(id)}>
        <View style={styles.container}>
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
        </View>
    </TouchableOpacity>
  )
}

export default memo(GasNoteItem)

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
        fontSize: RFValue(12),
        fontWeight: '500',
        color: '#797979',
        marginBottom: 2
    },
    costumer: {
        fontSize: RFValue(16),
        fontWeight: '500',
        color: 'black',
        marginBottom: 2
    },
    productName: {
        fontSize: RFValue(13),
        fontWeight: '500',
        color: '#797979',
        marginBottom: 5
    },
    status: (status) => ({
        fontSize: RFValue(11),
        fontWeight: '500',
        color: status != '0' ? '#E82D2D' : '#0E3BEF'
    }),  
    date: {
        fontSize: RFValue(13),
        color: '#797979',
        fontWeight: '500',
        textAlign: 'right',
    },
    dateMargin: {
        marginTop: 6
    }
})