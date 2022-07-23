import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Gap } from '../..'
import { currencyFormat, dateFormat } from '../../../utils'
import { RFValue } from 'react-native-responsive-fontsize'

const GasNoteDetailSet = ({detail}) => {
    return (
        <View style={styles.modalContent} >
            <View>
                <Text style={styles.label}>Penitip</Text>
                <Gap height={8} />
                <Text style={styles.costumer}>{detail.costumer_name}</Text>
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.date}>Tanggal diambil</Text>
                    <Text style={styles.date}>{dateFormat(detail.taken_at)}</Text>
                </View>
            </View>
        </View>
    )
}

export default GasNoteDetailSet

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
        fontSize: RFValue(16),
        fontWeight: '400',
        color: '#797979',
    },
    costumer: {
        fontSize: RFValue(20),
        fontWeight: '500',
        color: 'black',
    },
    id: {
        fontSize: RFValue(13),
        fontWeight: '400',
        color: '#797979',
    },
    line: width => ({
        width: '100%',
        borderWidth: width,
        borderColor: '#797979'
    }),
    detail: weight => ({
        fontSize: RFValue(16),
        fontWeight: weight,
        color: 'black'
    }),
    date: {
        fontSize: RFValue(14),
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
        fontSize: RFValue(16),
        fontWeight: '500',
        color: color
    })
})