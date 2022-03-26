import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { currencyFormat } from '../../../utils';

const GasItem = ({name, price, id}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.desc}>{currencyFormat(price)}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => navigation.navigate('UpdateGasPrice', {id})} >
                <Text style={styles.label}>Ubah Harga</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GasItem

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
        fontSize: 16,
        fontWeight: '500',
        color: 'black'
    },
    desc: {
        fontSize: 13,
        fontWeight: '500',
        color: '#797979'
    },
    button: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#2DE834'
    },
    label: {
        fontSize: 13,
        fontWeight: '400',
        color: 'black'
    }
})